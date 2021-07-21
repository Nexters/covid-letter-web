import {NextApiRequest, NextApiResponse} from 'next'
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {Todo} from '$types/todos'
import Axios from 'axios'

const getTodos = async (res: NextApiResponse<Response<Partial<Todo[]>>>) => {
    //todo: be api 호출은 어떤식으로 처리하면 좋을까요?
    const {data: todos}: {data: Todo[]} = await Axios.get('http://localhost:3001/todos')

    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: 'your todos!!',
        result: todos,
    })
}

const addTodo = async (
    req: NextApiRequest,
    res: NextApiResponse<Response<Partial<Todo[]>>>,
) => {
    const {data: addedTodo} = await Axios.post('http://localhost:3001/todos', {
        contents: req.body.contents,
        is_completed: false,
    })

    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: 'newTodo was added!!',
        result: addedTodo,
    })

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Partial<Todo[]>>>,
) {
    if (req.method === 'GET') {
        await getTodos(res)
        return
    }

    if (req.method === 'POST') {
        await addTodo(req, res)
        return
    }
}
