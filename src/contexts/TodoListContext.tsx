import {createContext, ReactNode, useEffect} from 'react'
import useRequest from '$hooks/useRequest'
import {mutate} from 'swr'

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

    const remove = async (id: number) => {
        const idx = todoList?.findIndex((d) => d.id === id)
        const clonedList: Todo[] = JSON.parse(JSON.stringify(todoList))
        if (idx != null) {
            clonedList.splice(idx, 1)
        }
        await mutate(clonedList, false)
    }
    const add = async (item: string) => {
        const newItem: Todo = {
            item,
            id: todoList?.length || 0,
        }
        const newList = [...todoList!, newItem]
        await mutate(newList, false)
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
