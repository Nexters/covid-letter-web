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
    const {letterLogin} = req.body
    try {
        const {data: {errorCode, message, data: letters}}: AxiosResponse<ServerResponse<Letter[]>> = await axios.get(`${API_URL_BASE}/letters`, {headers: {Authorization: letterLogin}})
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
                    //todo FE 에서 사용하기 편리하게 mapping 처리
                    createdDate: new Date().toDateString(), //현재 BE 테스트데이터에 createdDate 가 null 로 되어있어 임시용도
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
