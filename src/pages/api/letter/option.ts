import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import type {NextApiRequest, NextApiResponse} from 'next'
import {LetterOptionResponse} from '$types/response/letter'

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<LetterOptionResponse>,
) {
    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: [
            {
                covidStat: 1000,
                text: '코로나 1000명',
                questions: [
                    {
                        id: 1,
                        text: '질문 1',
                    },
                    {
                        id: 2,
                        text: '질문 2',
                    },
                    {
                        id: 3,
                        text: '질문 3',
                    },
                    {
                        id: 4,
                        text: '질문 4',
                    },
                ],
            },
            {
                covidStat: 2000,
                text: '코로나 2000명',
                questions: [
                    {
                        id: 10,
                        text: '질문 10',
                    },
                    {
                        id: 20,
                        text: '질문 20',
                    },
                    {
                        id: 30,
                        text: '질문 30',
                    },
                    {
                        id: 40,
                        text: '질문 40',
                    },
                ],
            },
        ],
    })
}
