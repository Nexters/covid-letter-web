import type {NextApiRequest, NextApiResponse} from 'next'
import {Letter} from '$types/response/letter'
import {Response, ServerResponse} from '$types/response'
import {RESPONSE} from '$constants'
import axios, {AxiosResponse} from 'axios'
import {API_URL_BASE} from '$config'

/**
 * 편지 읽음 처리
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Letter | null>>) {
    const {encryptedId} = req.query
    try {
        const {
            data: {errorCode, message, data: updatedLetter},
        }: AxiosResponse<ServerResponse<Letter>> = await axios.put(`${API_URL_BASE}/letters/${encryptedId}/state`)
        if (errorCode) {
            console.info(`errorCode: ${errorCode}, message: ${message}`)
            throw new Error(message)
        }

        res.status(200).json({
            code: RESPONSE.NORMAL,
            message: '',
            result: updatedLetter,
        })
    } catch (e) {
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '편지 읽음 처리 실패',
            result: null,
        })
    }
}
