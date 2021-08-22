import type {NextApiRequest, NextApiResponse} from 'next'
import {Letter} from '$types/response/letter'
import {Response, ServerResponse} from '$types/response'
import {RESPONSE} from '$constants'
import axios, {AxiosResponse} from 'axios'
import {API_URL_BASE} from '$config'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Letter | null>>
) {
    // const {encryptedId} = req.query
    try {
        // const {data: {errorCode, message, data: letter}}: AxiosResponse<ServerResponse<Letter>> = await axios.get(`${API_URL_BASE}/letters/${encryptedId}`)
        // if (errorCode) {
        //     console.info(`errorCode: ${errorCode}, message: ${message}`)
        //     throw new Error(message)
        // }

        const letter = {
            title: 'TITLE1',
            contents: '내용요용용용',
            email: 'email',
            name: null,
            state: 'PENDING',
            sticker: 'BLUE',
            questionId: 8,
            questionText: '질문질문 질문텍스트',
            encryptedId: 'ENCRYPTED2',
            sendOptionText: '해외 여행이 가능할 때',
            createdDate: '2021-08-04T12:09:59'
        }

        res.status(200).json({
            code: RESPONSE.NORAML,
            message: '',
            result: {
                ...letter,
                createdDate: new Date().toDateString(), //현재 BE 테스트데이터에 createdDate 가 null 로 되어있어 임시용도
                name: '최인혁', //todo remove 추후 서버 수정 시 삭제할 것
                sendOptionId: 1, //todo remove
            },
        })

    } catch (e) {
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '편지 상세 조회 실패',
            result: null,
        })
    }
}
