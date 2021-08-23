import {NAVER} from '$config'
import {GRANT_TYPE} from '$constants'
import {GrantType, TokenRequest, TokenResponse} from '$types/login/naver'
import {Response} from '$types/response'
import {createErrorResponse, createResponse} from '$utils/fetcher/withAxios'
import axios from 'axios'
import {NextApiRequest, NextApiResponse} from 'next'
import cookies from 'next-cookies'

const getRequestData = (
    grant_type: GrantType,
    {code, state, refresh_token, access_token, service_provider}: Partial<TokenRequest>,
) => {
    switch (grant_type) {
        case GRANT_TYPE.create:
            return {
                grant_type,
                code,
                state,
            }
        case GRANT_TYPE.refresh:
            return {
                grant_type,
                refresh_token,
            }
        case GRANT_TYPE.delete:
            return {
                grant_type,
                access_token,
                service_provider,
            }
    }
}

const routes = async (
    req: NextApiRequest,
    res: NextApiResponse<Response<Pick<TokenResponse, 'access_token' | 'expires_in' | 'refresh_token'> | string>>,
) => {
    const {grant_type} = req.body
    const {access_token: cookieAccessToken = undefined} = cookies({req})

    const requestData = getRequestData(grant_type, {
        ...req.body,
        access_token: cookieAccessToken,
    })

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
     * 발급: refresh_token DB 저장, access_token BE 세션 생성
     * 갱신: refresh_token 꺼내와서 token 갱신
     * 삭제: refresh_token 삭제 (연동 해제)
     */
    const {access_token, expires_in, refresh_token} = response.data

    res.status(200).json(createResponse({access_token, expires_in, refresh_token}))
}

module.exports = routes
