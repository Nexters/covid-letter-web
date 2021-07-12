// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants/index'
import {Response} from '$types/response'
import {User} from '$types/response/user'
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<User>>,
) {
    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: {name: 'John Doe', age: 22},
    })
}
