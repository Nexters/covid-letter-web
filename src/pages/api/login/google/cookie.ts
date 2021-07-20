// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {HOST_URL} from '$config'
import {Response} from '$types/response'
import {createResponse} from '$utils/fetcher/withAxios'
import type {NextApiRequest, NextApiResponse} from 'next'
import {SessionToken} from 'pages/api/mock/session'

interface CookieApiRequest extends NextApiRequest {
    body: SessionToken & {returnUrl: string}
}

const routes = async (
    req: CookieApiRequest,
    res: NextApiResponse<Response<string>>,
) => {
    const {accessToken, tokenExpirationTime, returnUrl} = req.body

    res.setHeader('Set-Cookie', [
        `letterLogin=${accessToken}; path=/; max-age=${tokenExpirationTime} HttpOnly`,
        `googleLogin=1; path=/; max-age=${tokenExpirationTime} HttpOnly`,
    ])
    res.status(200).json(createResponse(`${HOST_URL}${returnUrl}`))
}

module.exports = routes
