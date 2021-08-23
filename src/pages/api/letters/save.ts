import type {NextApiRequest, NextApiResponse} from 'next'
import {RESPONSE} from '$constants'
import {Response, ServerResponse} from '$types/response'
import axios, {AxiosResponse} from 'axios'
import {API_URL_BASE} from '$config'
import {Letter} from '$types/response/letter'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Letter | null>>) {
    try {
        const {contents, questionId, sendOptionId, sticker, title} = req.body

        const {
            data: {data},
        }: AxiosResponse<ServerResponse<Letter>> = await axios.post(
            `${API_URL_BASE}/letters`,
            {
                contents,
                questionId,
                sendOptionId,
                sticker,
                title,
            },
            {headers: req.headers},
        )

        res.status(200).json({
            code: RESPONSE.NORMAL,
            message: '편지 발송 성공',
            result: {
                ...data,
            },
        })
    } catch (e) {
        console.error(e)
        // res.status(500).json({
        //     code: RESPONSE.ERROR,
        //     message: '편지 발송 실패',
        //     result: null,
        // })
    }
}
