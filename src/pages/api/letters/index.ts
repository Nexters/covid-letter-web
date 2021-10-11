import type {NextApiRequest, NextApiResponse} from 'next'
import {RESPONSE} from '$constants'
import {Letter} from '$types/response/letter'
import {Response, ServerResponse} from '$types/response'
import axios, {AxiosResponse} from 'axios'
import {API_URL_BASE} from '$config'

const listLetters = async (req: NextApiRequest, res: NextApiResponse<Response<Letter[] | null>>) => {
    const {unposted} = req.query
    try {
        const {
            data: {errorCode, message, data: letters},
        }: AxiosResponse<ServerResponse<Letter[]>> = await axios.get(`${API_URL_BASE}/letters`, {
            params: {unposted},
            headers: req.headers,
        })
        if (errorCode) {
            console.info(`errorCode: ${errorCode}, message: ${message}`)
            throw new Error(message)
        }

        res.status(200).json({
            code: RESPONSE.NORMAL,
            message: '',
            result: letters.map((letter) => {
                return {
                    ...letter,
                    contents: '', //목록조회 시 contents 공백 처리(상세 조회 외에 contents 가 노출되면 안된다)
                }
            }),
        })
    } catch (e) {
        //e.message BE 에서 내려주는 error message 를 그대로 내려줄 지 고민
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '편지 목록 조회 실패',
            result: null,
        })
    }
}

const saveLetter = async (req: NextApiRequest, res: NextApiResponse<Response<Letter | null>>) => {
    try {
        const {contents, questionId, sendOptionId, sticker, title} = req.body

        const {
            data: {errorCode, message, data: letters},
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
        if (errorCode) {
            console.info(`errorCode: ${errorCode}, message: ${message}`)
            throw new Error(message)
        }

        res.status(200).json({
            code: RESPONSE.NORMAL,
            message: '편지 발송 성공',
            result: {
                ...letters,
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Letter[] | Letter | null>>) {
    if (req.method === 'GET') {
        await listLetters(req, res)
        return
    }

    if (req.method === 'POST') {
        await saveLetter(req, res)
        return
    }
}
