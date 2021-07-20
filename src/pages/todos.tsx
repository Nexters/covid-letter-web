import {Todo} from '$types/todos'
import useRequest from '$hooks/useRequest'

const Todos = () => {

    const {data: todos} = useRequest<Todo[]>(
        {
            url: `/todos`,
        },
        {
            revalidateOnMount: true,
            revalidateOnFocus: true, //신기해서 해봤습니다!
        },
    )

    if (!todos) {
        return (
            <h3>loading...</h3>
        )
    }

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
