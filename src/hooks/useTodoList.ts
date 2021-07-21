import {useContext} from 'react'
import {TodoListContext} from '../contexts/TodoListContext'

export const useTodoListContext = () => {
    return useContext(TodoListContext)
}
