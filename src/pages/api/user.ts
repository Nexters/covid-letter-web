// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {User} from '$types/response/user'
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<User>>,
) {
    const {ok} = req.query

    res.status(200).json({
        code: +ok ? RESPONSE.NORMAL : RESPONSE.ERROR,
        message: '',
        result: {name: 'John Doe', age: 22},
    })
}
