import {createResponse} from '$utils/fetcher/withAxios'
import {Response} from '$types/response'
import {NextApiRequest, NextApiResponse} from 'next'

const routes = async (
    _req: NextApiRequest,
    res: NextApiResponse<Response<string>>,
) => {
    res.setHeader('Set-Cookie', [
        `letterLogin=; path=/; expires=-1`,
        `googleLogin=; path=/; expires=-1`,
    ])
    res.status(200).json(createResponse('ok'))
    return
}

module.exports = routes
