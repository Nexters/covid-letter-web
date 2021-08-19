// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {ORIGIN_DOMAIN} from '$config'
import {Response} from '$types/response'
import {LoginToken} from '$types/response/login'
import {createResponse} from '$utils/fetcher/withAxios'
import type {NextApiRequest, NextApiResponse} from 'next'

interface CookieApiRequest extends NextApiRequest {
    body: LoginToken & {returnUrl: string}
}

const routes = async (req: CookieApiRequest, res: NextApiResponse<Response<string>>) => {
    const {accessToken, tokenExpirationTime, returnUrl} = req.body

    res.setHeader('Set-Cookie', [
        `letterLogin=${accessToken}; path=/; max-age=${tokenExpirationTime} HttpOnly`,
        `googleLogin=1; path=/; max-age=${tokenExpirationTime} HttpOnly`,
    ])
    res.status(200).json(createResponse(`${ORIGIN_DOMAIN}${returnUrl}`))
}

module.exports = routes
