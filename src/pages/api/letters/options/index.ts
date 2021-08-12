import {RESPONSE} from '$constants'
import type {NextApiRequest, NextApiResponse} from 'next'
import {LetterOptionResponse} from '$types/response/letter'

export default function handler(_req: NextApiRequest, res: NextApiResponse<LetterOptionResponse>) {
    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: [
            {
                id: 0,
                covidStat: 1000,
                text: '코로나 1000명',
            },
            {
                id: 1,
                covidStat: 2000,
                text: '코로나 2000명',
            },
            {
                id: 2,
                covidStat: 3000,
                text: '코로나 3000명',
            },
            {
                id: 3,
                covidStat: 4000,
                text: '코로나 4000명',
            },
            {
                id: 4,
                covidStat: 5000,
                text: '코로나 5000명',
            },
        ],
    })
}
