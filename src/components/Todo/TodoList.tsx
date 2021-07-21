import TodoItem from '$components/Todo/TodoItem'
import {Todo} from '../../contexts/TodoListContext'
import {useTodoListContext} from '$hooks/useTodoList'
import TodoInput from '$components/Todo/TodoInput'

const TodoList = () => {
    const {todoList} = useTodoListContext()
    return (
        <div>
            <TodoInput />
            {todoList?.map((d: Todo) => (
                <TodoItem
                    key={d.id}
                    id={d.id}
                    item={d.item}
                    complete={d.complete}
                />
            ))}
        </div>
    )
}

export default TodoList
