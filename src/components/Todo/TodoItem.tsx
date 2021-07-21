import React from 'react'
import {useTodoListContext} from '$hooks/useTodoList'

// eslint-disable-next-line react/prop-types,@typescript-eslint/no-unused-vars
const TodoItem = ({item}) => {
    // const {remove} = useTodoListContext()

    return (
        <>
            <li>
                <div className="content">{item}</div>
            </li>
        </>
    )
}

export default TodoItem
