// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {API_URL_BASE} from '$config/index'
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {User} from '$types/response/user'
import axios, {AxiosResponse} from 'axios'
import {ServerResponse} from '$types/response'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Partial<User>>>) {
    const {accessToken} = req.query
    const headers = {
        Authorization: `${accessToken}`,
        'User-Agent': req.headers['user-agent'],
    }

    const {
        data: {data},
    }: AxiosResponse<ServerResponse<User>> = await axios.get(`${API_URL_BASE}/user`, {
        headers,
    })

    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: data,
    })
}
