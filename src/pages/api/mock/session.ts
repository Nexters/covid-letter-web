// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import type {NextApiRequest, NextApiResponse} from 'next'

export interface SessionToken {
    accessToken: string
    tokenExpirationTime: number
}

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Response<SessionToken>>,
) {
    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: {accessToken: 'EXAMPLETOKEN', tokenExpirationTime: 3600},
    })
}
