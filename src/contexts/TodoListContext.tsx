import {createContext, ReactNode, useEffect} from 'react'
import useRequest from '$hooks/useRequest'

export interface Todo {
    id: number
    item: string
    // complete: boolean
}

export interface TodoListContextState {
    todoList: Todo[] | undefined
    remove: (id: number) => void
    add: (item: string) => void
}

export const TodoListContext = createContext<TodoListContextState>(
    {} as TodoListContextState,
)

export const TodoListProvider = ({children}: {children: ReactNode}) => {
    const {data: todoList} = useRequest<Todo[]>(
        {
            url: '/todo',
        },
        {
            revalidateOnMount: true,
        },
    )
    useEffect(() => {
        if (!todoList) return
    }, [todoList])

    function remove(id: number) {
        const idx = todoList?.findIndex((d) => d.id === id)
        const clonedList: Todo[] = JSON.parse(JSON.stringify(todoList))
        if (idx != null) {
            clonedList.splice(idx, 1)
        }
    }
    function add(item: string) {
        // const newItem: Todo = {
        //     item,
        //     id: todoList?.length || 0,
        // }
    }
    return (
        <TodoListContext.Provider
            value={{
                todoList,
                remove,
                add,
            }}>
            {children}
        </TodoListContext.Provider>
    )
}
