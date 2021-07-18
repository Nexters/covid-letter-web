// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {HOST_URL} from '$config'
import ROUTES from '$constants/routes'
import {Response} from '$types/response'
import {createResponse} from '$utils/fetcher/withAxios'
import type {NextApiRequest, NextApiResponse} from 'next'
import {SessionToken} from 'pages/api/mock/session'

interface CookieApiRequest extends NextApiRequest {
    body: SessionToken
}

const routes = async (
    req: CookieApiRequest,
    res: NextApiResponse<Response<string>>,
) => {
    const {token, expires_in} = req.body

    res.setHeader(
        'Set-Cookie',
        `letterLogin=${token}; path=/; max-age=${expires_in} HttpOnly`,
    )
    res.status(200).json(createResponse(`${HOST_URL}${ROUTES.MAIN}`))
}

module.exports = routes
