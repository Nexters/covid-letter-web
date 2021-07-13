import {NAVER} from '$config'
import {GrandType, TokenRequest, TokenResponse} from '$types/login/naver'
import {Response} from '$types/response'
import {createErrorResponse, createResponse} from '$utils/fetcher/withAxios'
import axios from 'axios'
import {NextApiRequest, NextApiResponse} from 'next'

const getRequestData = (
    grant_type: GrandType,
    {
        code,
        state,
        refresh_token,
        access_token,
        service_provider,
    }: Partial<TokenRequest>,
) => {
    switch (grant_type) {
        case GrandType.create:
            return {
                grant_type,
                code,
                state,
            }
        case GrandType.refresh:
            return {
                grant_type,
                service_provider,
                refresh_token,
            }
        case GrandType.delete:
            return {
                grant_type,
                access_token,
                service_provider,
            }
    }
}

const routes = async (
    req: NextApiRequest,
    res: NextApiResponse<
        Response<Pick<TokenResponse, 'access_token' | 'expires_in'>>
    >,
) => {
    const {grant_type} = req.body

    const requestData = getRequestData(grant_type, req.body)

    const response = await axios.get(`https://nid.naver.com/oauth2.0/token`, {
        params: {
            client_id: NAVER.CLIENT_ID,
            client_secret: NAVER.CLIENT_SECRET,
            ...requestData,
        },
    })

    if (response.data.error) {
        res.status(200).json(createErrorResponse(response.data))
        return
    }

    /**
     * @todo refresh_token DB 저장
     */
    const {access_token, expires_in} = response.data

    res.status(200).json(createResponse({access_token, expires_in}))
}

module.exports = routes
