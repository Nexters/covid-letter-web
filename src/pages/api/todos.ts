import {NextApiRequest, NextApiResponse} from 'next'
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {Todo} from '$types/todos'
import Axios from 'axios'

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Response<Partial<Todo[]>>>,
) {
    //todo: be api 호출은 어떤식으로 처리하면 좋을까요?
    const {data: todos}: {data: Todo[]} = await Axios.get('http://localhost:3001/todos')

    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: 'your todos!!',
        result: todos,
    })
}
