import React from 'react'
import {useTodoListContext} from '$hooks/useTodoList'
import {Todo} from '../../contexts/TodoListContext'

const TodoItem = ({id, item}: Todo) => {
    const {remove} = useTodoListContext()

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        remove(id)
    }
    return (
        <>
            <li>
                <div className="content">{item}</div>
                <button onClick={handleClick}>x</button>
            </li>
        </>
    )
}

export default TodoItem
