import {withAxios} from '$utils/fetcher/withAxios'
import {Todo} from '$types/todos'

const Todos = ({todos}: {todos: Todo[]}) => {
    /**
     * todo: 변수네이밍 고민됩니다!
     */
    const todoList = todos.map(({id, contents, is_completed}: Todo) => (
        <li key={`todo-${id}`}>
            <input type='checkbox' defaultChecked={is_completed} />
            <span>{contents}</span>
        </li>
    ))

    return (
        <ul>
            {todoList}
        </ul>
    )
}

Todos.getInitialProps = async () => {
    const todos = await withAxios<Partial<Todo[]>>({
        url: `/todos`,
        method: 'get',
    })

    return {
        todos,
    }
}

export default Todos
