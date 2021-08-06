import {createResponse} from '$utils/fetcher/withAxios'
import {Response} from '$types/response'
import {NextApiRequest, NextApiResponse} from 'next'
import {LetterStats} from '$types/response/analyze'

const routes = async (_req: NextApiRequest, res: NextApiResponse<Response<LetterStats>>) => {
    res.setHeader('Set-Cookie', [`letterLogin=; path=/; expires=-1`, `googleLogin=; path=/; expires=-1`])
    res.status(200).json(
        createResponse({
            unsented: 12000,
            sented: 9199,
        }),
    )
    return
}

module.exports = routes
