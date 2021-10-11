import type {NextApiRequest, NextApiResponse} from 'next'
import {Letter} from '$types/response/letter'
import {Response, ServerResponse} from '$types/response'
import {RESPONSE} from '$constants'
import axios, {AxiosResponse} from 'axios'
import {API_URL_BASE} from '$config'

/**
 * 발송기준 해당하는 메일 발송 API
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Letter | null>>) {
    const {sendOptionId} = req.query

    try {
        const {
            data: {errorCode, message},
        }: AxiosResponse<ServerResponse<null>> = await axios.get(`${API_URL_BASE}/mail/${sendOptionId}`, {
            headers: req.headers,
        })
        if (errorCode) {
            console.info(`errorCode: ${errorCode}, message: ${message}`)
            throw new Error(message)
        }

        res.status(200).json({
            code: RESPONSE.NORMAL,
            message: '',
            result: null,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '이메일 발송 실패',
            result: null,
        })
    }
}
