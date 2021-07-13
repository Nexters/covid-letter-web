// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Response<null>>,
) {
    res.status(200).json({
        code: RESPONSE.REDIRECT,
        message: '',
        result: null,
    })
}
