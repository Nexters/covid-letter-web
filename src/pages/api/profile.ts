import {API_URL_BASE} from '$config/index'
import {RESPONSE} from '$constants'
import {Response, ServerResponse} from '$types/response'
import {User} from '$types/response/user'
import axios, {AxiosResponse} from 'axios'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Partial<User>>>) {
    const {
        data: {data},
    }: AxiosResponse<ServerResponse<User>> = await axios.get(`${API_URL_BASE}/user`, {
        headers: req.headers,
    })

    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: data,
    })
}
