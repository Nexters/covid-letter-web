import TodoItem from '$components/Todo/TodoItem'
import {Todo} from '../../contexts/TodoListContext'
import {useTodoListContext} from '$hooks/useTodoList'
import TodoInput from '$components/Todo/TodoInput'
import {useRef} from 'react'

const TodoList = () => {
    const {todoList} = useTodoListContext()
    const inputRef = useRef('')
    return (
        <div>
            <TodoInput ref={inputRef} />
            {todoList?.map((d: Todo) => (
                <TodoItem key={d.id} id={d.id} item={d.item} />
            ))}
        </div>
    )
}

export default TodoList
