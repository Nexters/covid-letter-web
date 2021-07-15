// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {Todo} from '$types/response/todo'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Todo[]>>,
) {
    // const sleep = () =>
    //     new Promise((resolve) => setTimeout(() => resolve(1), 3000))
    // await sleep()
    const {todos} = req.body
    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: todos,
    })
}
