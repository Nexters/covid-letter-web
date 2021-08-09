// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {User} from '$types/response/user'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Response<Partial<User>>>) {
    // const {accessToken} = req.query
    // const headers = {
    //     Authorization: `Bearer ${accessToken}`,
    //     'User-Agent': req.headers['user-agent'],
    // }

    // const {
    //     data: {data},
    // }: AxiosResponse<ServerResponse<User>> = await axios.get(`${API_URL_BASE}/user`, {
    //     headers,
    // })

    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: {
            email: 'workingnewjeong@gmail.com',
            name: 'Yujeong Jeon',
            id: 'rejrlwrjelreji',
        },
    })
}
