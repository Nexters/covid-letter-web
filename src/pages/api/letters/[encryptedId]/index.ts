import type {NextApiRequest, NextApiResponse} from 'next'
import {Letter} from '$types/response/letter'
import {Response, ServerResponse} from '$types/response'
import {RESPONSE} from '$constants'
import axios, {AxiosResponse} from 'axios'
import {API_URL_BASE} from '$config'

const getLetter = async (req: NextApiRequest, res: NextApiResponse<Response<Letter | null>>) => {
    const {encryptedId} = req.query
    try {
        const {
            data: {errorCode, message, data: letter},
        }: AxiosResponse<ServerResponse<Letter>> = await axios.get(`${API_URL_BASE}/letters/${encryptedId}`)
        if (errorCode) {
            console.info(`errorCode: ${errorCode}, message: ${message}`)
            throw new Error(message)
        }

        res.status(200).json({
            code: RESPONSE.NORAML,
            message: '',
            result: letter,
        })
    } catch (e) {
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '편지 상세 조회 실패',
            result: null,
        })
    }
}

const saveLetter = async (req: NextApiRequest, res: NextApiResponse<Response<Letter | null>>) => {
    try {
        const {encryptedId} = req.query
        const {sendOptionId} = req.body

        const {
            data: {errorCode, message, data: letter},
        }: AxiosResponse<ServerResponse<Letter>> = await axios.put(
            `${API_URL_BASE}/letters/${encryptedId}`,
            {sendOptionId},
            {headers: req.headers},
        )

        if (errorCode) {
            console.info(`errorCode: ${errorCode}, message: ${message}`)
            throw new Error(message)
        }

        res.status(200).json({
            code: RESPONSE.NORMAL,
            message: '편지 발송 성공',
            result: {
                ...letter,
            },
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '편지 발송 실패',
            result: null,
        })
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Letter | null>>) {
    if (req.method === 'GET') {
        await getLetter(req, res)
        return
    }

    if (req.method === 'POST') {
        await saveLetter(req, res)
        return
    }
}
