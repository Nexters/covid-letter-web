// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants'
import {Profile} from '$types/login/naver'
import {Response} from '$types/response'
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Response<Partial<Profile>>>,
) {
    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: {
            email: 'dbwjd3508@naver.com',
            name: '전유정',
            gender: 'F',
            age: '20~29',
        },
    })
}
