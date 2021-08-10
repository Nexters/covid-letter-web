import {createResponse} from '$utils/fetcher/withAxios'
import {Response} from '$types/response'
import {NextApiRequest, NextApiResponse} from 'next'
import {CovidStats} from '$types/response/stat'

const routes = async (_req: NextApiRequest, res: NextApiResponse<Response<CovidStats>>) => {
    res.setHeader('Set-Cookie', [`letterLogin=; path=/; expires=-1`, `googleLogin=; path=/; expires=-1`])
    res.status(200).json(
        createResponse({
            completeCure: 153201,
            completeShot: 11.19,
            confirmedCase: 171203,
            confirmedIncrease: 99,
            cureIncrease: 1002,
            shotRate: 1.1,
        }),
    )
    return
}

module.exports = routes
