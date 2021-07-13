import {Response} from '$types/response'
import type {NextApiRequest, NextApiResponse} from 'next'

interface ApiRequest extends NextApiRequest {
    query: {
        [key: string]: string
    }
}

const routes = async (
    req: ApiRequest,
    res: NextApiResponse<Response<null>>,
) => {
    /**
     * @todo 사용자 프로필 조회 API 순서
     * 1. access_token 유효성 검사
     * 2. 프로필 조회 api 호출
     */
}

export default routes
