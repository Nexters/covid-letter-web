// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import type {NextApiRequest, NextApiResponse} from 'next'
import {AuthorizeRequest, AuthorizeResponse} from '$types/login/naver'
import {generateToken} from '$utils/token'
import {NAVER} from '$config'

interface ApiRequest extends NextApiRequest {
    query: {
        [key: string]: string
    }
}

const routes = async (
    req: ApiRequest,
    res: NextApiResponse<Response<AuthorizeResponse>>,
) => {
    try {
        const {redirect_uri} = req.query

        const state = generateToken()

        req.headers.cookie = JSON.stringify({state})

        const {CLIENT_ID} = NAVER

        const body: AuthorizeRequest = {
            redirect_uri,
            client_id: CLIENT_ID,
            response_type: 'code',
            state,
        }

        const {client_id, response_type} = body

        res.status(200).json({
            code: RESPONSE.NORMAL,
            message: '네이버 로그인 필요',
            result: {
                redirectUrl: `https://nid.naver.com/oauth2.0/authorize?redirect_uri=${redirect_uri}&client_id=${client_id}&response_type=${response_type}&state=${state}`,
            },
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '네이버 로그인 실패',
            result: {
                redirectUrl: '',
            },
        })
    }
}

export default routes
