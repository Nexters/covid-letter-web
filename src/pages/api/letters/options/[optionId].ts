import type {NextApiRequest, NextApiResponse} from 'next'
import {Question} from '$types/response/letter'
import {Response, ServerResponse} from '$types/response'
import {RESPONSE} from '$constants'
import axios, {AxiosResponse} from 'axios'
import {API_URL_BASE} from '$config'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Question[] | null>>) {
    const {optionId} = req.query
    try {
        const {
            data: {errorCode, message, data: questions},
        }: AxiosResponse<ServerResponse<Question[]>> = await axios.get(
            `${API_URL_BASE}/letters/options/${optionId}/questions`,
            {
                headers: req.headers,
            },
        )
        if (errorCode) {
            console.info(`errorCode: ${errorCode}, message: ${message}`)
        }

        const getRandomQuestion = (arr: Question[]) => {
            const tempArr = arr.sort(() => Math.random() - 0.5)
            return tempArr.splice(0, 3)
        }

        const questionByOption = getRandomQuestion(questions.filter((question) => !question.commonOptionId))
        const commonQuestion = getRandomQuestion(questions.filter((question) => question.commonOptionId))
        const questionArr = [{id: -1, text: '', commonOptionId: false}, ...questionByOption, ...commonQuestion]

        res.status(200).json({
            code: RESPONSE.NORAML,
            message: '',
            result: {
                ...questionArr,
            },
        })
    } catch (e) {
        res.status(500).json({
            code: RESPONSE.ERROR,
            message: '질문 가져오기 실패',
            result: null,
        })
    }
}
