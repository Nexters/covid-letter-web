import {NextApiRequest, NextApiResponse} from 'next'
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {Todo} from '$types/todos'

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Response<Partial<Todo[]>>>,
) {
    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: 'your todos!!',
        result: [
            {
                id: '69e1addf-32d4-41ed-9cbc-f743ab4fc905',
                contents: 'nextjs 공부하기',
                is_completed: false,
            },
            {
                id: '1e38d9e6-b17b-44c4-b351-2ad341427463',
                contents: 'typescript 공부하기',
                is_completed: false,
            },
            {
                id: 'af59ec08-8276-40fb-9550-538017f8b5d0',
                contents: 'react 공부하기',
                is_completed: false,
            },
            {
                id: 'f5944d57-59be-402a-b323-ce11c8f613bb',
                contents: 'emotion 공부하기',
                is_completed: false,
            },
        ],
    })
}
