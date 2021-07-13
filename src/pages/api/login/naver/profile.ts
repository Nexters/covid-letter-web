import {RESPONSE} from '$constants'
import {ProfileResponse, VerifyResponse} from '$types/login/naver'
import {Response} from '$types/response'
import {createErrorResponse, createResponse} from '$utils/fetcher/withAxios'
import axios, {AxiosResponse} from 'axios'
import type {NextApiRequest, NextApiResponse} from 'next'
import cookies from 'next-cookies'

interface ApiRequest extends NextApiRequest {
    query: {
        [key: string]: string
    }
}

const routes = async (
    req: ApiRequest,
    res: NextApiResponse<Response<ProfileResponse>>,
) => {
    /**
     * @todo 사용자 프로필 조회 API 순서
     * 1. access_token 유효성 검사
     * 2. 프로필 조회 api 호출
     */
    try {
        const {at} = cookies({req})

        const headers = {
            Authorization: `Bearer ${at}`,
            'User-Agent': req.headers['user-agent'],
        }

        const {
            data: {resultcode},
        }: AxiosResponse<VerifyResponse> = await axios.get(
            'https://openapi.naver.com/v1/nid/verify',
            {
                headers,
            },
        )

        /** access_token 검증 실패 */
        if (resultcode !== RESPONSE.NORMAL) {
            res.status(200).json(
                createResponse(
                    {} as ProfileResponse,
                    RESPONSE.INVALID_ACCESS_TOKEN,
                ),
            )
            return
        }

        const {data: profileResult}: AxiosResponse<ProfileResponse> =
            await axios.get('https://openapi.naver.com/v1/nid/me', {
                headers,
            })

        if (profileResult.resultcode !== RESPONSE.NORMAL) {
            throw profileResult
        }

        res.status(200).json(createResponse(profileResult))
    } catch (error) {
        console.log(error)
        res.status(200).json(createErrorResponse({} as ProfileResponse))
    }
}

export default routes
