import {NextApiRequest, NextApiResponse} from 'next'
import {Response} from '$types/response'
import Axios from 'axios'
import {RESPONSE} from '$constants'

interface ApiRequest extends NextApiRequest {
    query: {
        id: string,
    }
}

const deleteTodo = async (
    req: ApiRequest,
    res: NextApiResponse<Response<Partial<string>>>,
) => {
    const todoId: string = req.query.id
    await Axios.delete(`http://localhost:3001/todos/${todoId}`)

    res.status(200).json({
        code: RESPONSE.NORMAL,
        message: 'todo was deleted!!',
        result: todoId,
    })
}

export default async function handler(
    req: ApiRequest,
    res: NextApiResponse<Response<Partial<string>>>,
) {
    if (req.method === 'PUT') {
        //todo 수정
        return
    }

    if (req.method === 'DELETE') {
        await deleteTodo(req, res)
        return
    }
}
