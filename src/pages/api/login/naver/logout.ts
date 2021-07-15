import {createResponse} from '$utils/fetcher/withAxios'
import {Response} from '$types/response'
import {NextApiRequest, NextApiResponse} from 'next'

const routes = async (
    _req: NextApiRequest,
    res: NextApiResponse<Response<string>>,
) => {
    /** 쿠키와 BE 세션만 삭제 */
    /** 네이버는 연동해제해야 다른 아이디로 로그인 가능, 하지만 연동해제하면 동의가 철회됨 */
    res.setHeader('Set-Cookie', `access_token=; path=/; expires=-1`)
    res.status(200).json(createResponse('ok'))
    return
}

module.exports = routes
