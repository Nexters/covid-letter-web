import {createResponse} from '$utils/fetcher/withAxios'
import {Response} from '$types/response'
import {NextApiRequest, NextApiResponse} from 'next'

const routes = async (
    _req: NextApiRequest,
    res: NextApiResponse<Response<string>>,
) => {
    /**
     * @todo 쿠키 삭제 및 BE 로그아웃 api 호출
     *  */
    res.setHeader('Set-Cookie', `letterLogin=; path=/; expires=-1`)
    res.status(200).json(createResponse('ok'))
    return
}

module.exports = routes
