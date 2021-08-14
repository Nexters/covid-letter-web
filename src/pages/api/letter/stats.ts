import {createResponse} from '$utils/fetcher/withAxios'
import {Response} from '$types/response'
import {NextApiRequest, NextApiResponse} from 'next'
import {LetterStats} from '$types/response/stat'

const routes = async (_req: NextApiRequest, res: NextApiResponse<Response<LetterStats>>) => {
    res.status(200).json(
        createResponse({
            unsented: 12000,
            sented: 9199,
        }),
    )
    return
}

module.exports = routes
