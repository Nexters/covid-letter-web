// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import type {NextApiRequest, NextApiResponse} from 'next'

import axios, {AxiosResponse} from 'axios'
import {ServerResponse} from '$types/response'
import {LoginToken} from '$types/response/login'

interface ApiRequest extends NextApiRequest {
    query: {
        [key: string]: string
    }
}

const routes = async (req: ApiRequest, res: NextApiResponse<Response<LoginToken>>) => {
    try {
        const {email, name, identifier} = req.body

        const {
            data: {data},
        }: AxiosResponse<ServerResponse<LoginToken>> = await axios.post('http://49.50.164.234:8080/login', {
            email,
            name,
            identifier,
        })

        res.status(200).json({
            code: RESPONSE.NORMAL,
            message: '네이버 로그인 필요',
            result: {
                ...data,
            },
        })
    } catch (e) {
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '로그인 실패',
            result: {
                accessToken: '',
                tokenExpirationTime: 0,
            },
        })
    }
}

export default routes
