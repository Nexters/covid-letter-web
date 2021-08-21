import type {NextApiRequest, NextApiResponse} from 'next'
import {RESPONSE} from '$constants'
import {Letter} from '$types/response/letter'
import {Response, ServerResponse} from '$types/response'
import axios, {AxiosResponse} from 'axios'
import {API_URL_BASE} from '$config'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Letter[] | null>>,
) {
    const {letterLogin, unposted} = req.body
    try {
        const {data: {errorCode, message, data: letters}}: AxiosResponse<ServerResponse<Letter[]>> = await axios.get(`${API_URL_BASE}/letters?unposted=${unposted}`, {headers: {Authorization: letterLogin}})
        if (errorCode) {
            console.info(`errorCode: ${errorCode}, message: ${message}`)
            throw new Error(message)
        }

        res.status(200).json({
            code: RESPONSE.NORAML,
            message: '',
            result: letters.map(letter => {
                return {
                    ...letter,
                    contents: '', //목록조회 시 contents 공백 처리(상세 조회 외에 contents 가 노출되면 안된다)
                    name: '최인혁', //todo remove 추후 서버 수정 시 삭제할 것
                }
            })
        })

    } catch (e) { //e.message BE 에서 내려주는 error message 를 그대로 내려줄 지 고민
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '편지 목록 조회 실패',
            result: null,
        })
    }
}
