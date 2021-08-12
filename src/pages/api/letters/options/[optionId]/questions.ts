import type {NextApiRequest, NextApiResponse} from 'next'
import {Question} from '$types/response/letter'
import {Response} from '$types/response'
import {RESPONSE} from '$constants'

export default function handler(_req: NextApiRequest, res: NextApiResponse<Response<Question[] | null>>) {
    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: [
            {
                id: 0,
                text: '코로나 1000명',
                commonOptionId: false,
            },
            {
                id: 1,
                text: '코로나 2000명',
                commonOptionId: false,
            },
            {
                id: 2,
                text: '코로나 3000명',
                commonOptionId: false,
            },
            {
                id: 3,
                text: '코로나 4000명',
                commonOptionId: true,
            },
            {
                id: 4,
                text: '코로나 5000명',
                commonOptionId: true,
            },
        ],
    })
}
