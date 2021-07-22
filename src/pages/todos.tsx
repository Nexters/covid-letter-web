import {Todo} from '$types/todos'
import useRequest from '$hooks/useRequest'
import useAsyncError from '$hooks/useAsyncError'
import TodoInput from '$components/todos/TodoInput'
import {withAxios} from '$utils/fetcher/withAxios'
import TodoFooter from '$components/todos/TodoFooter'
import {useState} from 'react'
import {TODO_FILTER} from '$constants/todoFilter'

const Todos = () => {

    const [todoFilter, setTodoFilter] = useState(TODO_FILTER.ALL)
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

    const changeTodoFilter = (willChangeTodoFilter: TODO_FILTER) => {
        setTodoFilter(willChangeTodoFilter)
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

    const deleteTodo = async (todoId: string) => {
        const deletedTodoId = await withAxios({
            url: `/todos/${todoId}`,
            method: 'DELETE',
        })

        console.info('deletedTodo:', deletedTodoId)
        await refreshTodos()
    }

    const todoItems = todos
        .filter(({is_completed}: Todo) => {
            if (todoFilter === TODO_FILTER.ACTIVE) {
                return !is_completed
            }
            if (todoFilter === TODO_FILTER.COMPLETED) {
                return is_completed
            }
            return true
        })
        .map(({id, contents, is_completed}: Todo) => (
            <li key={`todo-${id}`}>
                <input type='checkbox' defaultChecked={is_completed} />
                <span>{contents}</span>
                <button style={{
                    border: '1px solid',
                    backgroundColor: '#fe1',
                }} onClick={() => deleteTodo(id)}>삭제
                </button>
            </li>
        ))

    return (
        <>
            <TodoInput addTodo={addTodo} />
            <ul>
                {todoItems}
            </ul>
            <TodoFooter todoFilter={todoFilter} changeTodoFilter={changeTodoFilter} />
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
