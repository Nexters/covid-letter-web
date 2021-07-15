import {createContext, ReactNode, useContext, useState} from 'react'

export interface Todo {
    id: number
    title: string
    complete: boolean
}

export interface TodoListContextState {
    list: Todo[]
    toggle: (id: number) => void
    delete: (id: number) => void
    insert: (title: string) => void
    isEmptyTodoList: boolean
}

export const TodoListContext = createContext<TodoListContextState>(
    {} as TodoListContextState,
)

export const TodoListProvider = ({
    intialData,
    children,
}: {
    intialData?: Todo[]
    children: ReactNode
}) => {
    const [list, setList] = useState<Todo[]>(() => intialData || [])

    const findTodoItemIndex = (id: number) => {
        const index = list.findIndex(
            ({id: todoId}: Pick<Todo, 'id'>) => todoId === id,
        )
        if (index < 0) {
            throw Error('Not found index in TodoList')
        }
        return index
    }

    const value = {
        list,
        toggle(id: number) {
            const index = findTodoItemIndex(id)
            const nextList: Todo[] = JSON.parse(JSON.stringify(list))
            const prev = nextList[index].complete
            nextList[index].complete = !prev
            setList(nextList)
        },
        delete(id: number) {
            const index = findTodoItemIndex(id)
            const nextList: Todo[] = JSON.parse(JSON.stringify(list))
            nextList.splice(index, 1)
            setList(nextList)
        },
        insert(title: string) {
            const newTodo: Todo = {
                title,
                id: list.length,
                complete: false,
            }
            setList([...list, newTodo])
        },
        isEmptyTodoList: list.length < 1,
    }
    return (
        <TodoListContext.Provider value={value}>
            {children}
        </TodoListContext.Provider>
    )
}

export const useTodoListContext = () => {
    const context = useContext(TodoListContext)

    if (!context || context === ({} as TodoListContextState)) {
        throw new Error('You need to wrap TodoListProvider.')
    }

    return context
}
