import {createContext, ReactNode, useContext, useEffect, useState} from 'react'

export interface Todo {
    id: number
    title: string
    complete: boolean
}

export interface TodoListContextState {
    numOfTodos: number
    list: Todo[]
    toggle: (id: number) => void
    delete: (id: number) => void
    insert: (title: string) => void
    filter: (tag: FilterBase) => void
    activeTag: FilterBase
    isEmptyTodoList: boolean
}

export const TodoListContext = createContext<TodoListContextState>(
    {} as TodoListContextState,
)

export const FilterBase = {
    ALL: 'all',
    COMPLETE: 'complete',
    INCOMPLETE: 'incomplete',
} as const

export type FilterBase = typeof FilterBase[keyof typeof FilterBase]

export const TodoListProvider = ({
    intialData,
    children,
}: {
    intialData?: Todo[]
    children: ReactNode
}) => {
    const [list, setList] = useState<Todo[]>(() => intialData || [])
    const [filteredList, setFilteredList] = useState<Todo[]>(
        () => intialData || [],
    )
    const [activeTag, setActiveTag] = useState<FilterBase>(FilterBase.ALL)

    const findTodoItemIndex = (id: number) => {
        const index = list.findIndex(
            ({id: todoId}: Pick<Todo, 'id'>) => todoId === id,
        )
        if (index < 0) {
            throw Error('Not found index in TodoList')
        }
        return index
    }

    const filter = () => {
        if (activeTag === FilterBase.ALL) {
            setFilteredList(list)
            return
        }
        const base = activeTag === FilterBase.COMPLETE ? true : false
        const nextList = list.filter(({complete}) => complete === base)
        setFilteredList(nextList)
    }

    useEffect(() => {
        filter()
    }, [list])

    useEffect(() => {
        filter()
    }, [activeTag])

    const numOfTodos = list.filter((elem) => !elem.complete).length

    const value = {
        numOfTodos,
        list: filteredList,
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
        filter(tag: FilterBase) {
            setActiveTag(tag)
        },
        activeTag,
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
