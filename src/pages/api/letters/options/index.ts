import type {NextApiRequest, NextApiResponse} from 'next'
import {COMMON_OPTION_ID, NO_OPTION_ID, RESPONSE} from '$constants'
import {LetterOption} from '$types/response/letter'
import {Response, ServerResponse} from '$types/response'
import axios, {AxiosResponse} from 'axios'
import {API_URL_BASE} from '$config'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<LetterOption[] | null>>) {
    try {
        const {
            data: {errorCode, message, data: options},
        }: AxiosResponse<ServerResponse<LetterOption[]>> = await axios.get(`${API_URL_BASE}/letters/options`, {
            headers: req.headers,
        })
        if (errorCode) {
            console.info(`errorCode: ${errorCode}, message: ${message}`)
            throw new Error(message)
        }

        const optionArray = options.reduce((pre: LetterOption[], option: LetterOption) => {
            if (option.id !== COMMON_OPTION_ID && option.id !== NO_OPTION_ID) pre.push(option)
            return pre
        }, [])

        res.status(200).json({
            code: RESPONSE.NORAML,
            message: '',
            result: optionArray.reverse(),
        })
    } catch (e) {
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '옵션 목록 조회 실패',
            result: null,
        })
    }
}
