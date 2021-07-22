// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import type {NextApiRequest, NextApiResponse} from 'next'
import {Todo} from '../../contexts/TodoListContext'

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Response<Todo[]>>,
) {
    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: '',
        result: [
            {
                id: 1,
                item: 'test 1',
            },
            {
                id: 2,
                item: 'test 2',
            },
            {
                id: 3,
                item: 'test 3',
            },
        ],
    })
}
