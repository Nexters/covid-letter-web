import {Todo} from '$types/todos'
import useRequest from '$hooks/useRequest'
import useAsyncError from '$hooks/useAsyncError'
import TodoInput from '$components/todos/TodoInput'
import {withAxios} from '$utils/fetcher/withAxios'

const Todos = () => {

    const {
        data: todos,
        error,
        mutate: refreshTodos,
    } = useRequest<Todo[]>(
        {
            url: `/todos`,
        },
        {
            revalidateOnMount: true,
            revalidateOnFocus: true, //신기해서 해봤습니다!
        },
    )

    const throwError = useAsyncError()
    if (error) {
        throwError(error)
    }

    if (!todos) {
        return (
            <h3>loading...</h3>
        )
    }

    const addTodo = async ({contents}: {contents: string}) => {
        const addedTodo = await withAxios({
            url: '/todos',
            method: 'POST',
            data: {
                contents,
            },
        })
        console.info('addedTodo:', addedTodo)

        await refreshTodos()
    }

    const todoItems = todos.map(({id, contents, is_completed}: Todo) => (
        <li key={`todo-${id}`}>
            <input type='checkbox' defaultChecked={is_completed} />
            <span>{contents}</span>
        </li>
    ))

    return (
        <>
            <TodoInput addTodo={addTodo} />
            <ul>
                {todoItems}
            </ul>
        </>
    )
}

/** useRequest hook 방식으로 변경하며 주석처리
 Todos.getInitialProps = async () => {
        const todos = await withAxios<Partial<Todo[]>>({
            url: `/todos`,
            method: 'get',
        })

        return {
            todos,
        }
    }
 */

export default Todos
