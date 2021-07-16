import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import useAsyncError from '$hooks/useAsyncError'
import {Todo} from '$types/response/todo'

import useSWR from 'swr'

export interface TodoListContextState {
    isLoading: boolean
    numOfTodos: number
    list: Todo[]
    toggle: (id: number) => void
    delete: (id: number) => void
    insert: (title: string) => void
    filter: (tag: FilterBase) => void
    activeTag: FilterBase
    deleteCompleteTodos: () => void
    isEmptyTodoList: boolean
    update: () => void
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
    const [list, setList] = useState<Todo[]>([])
    const [filteredList, setFilteredList] = useState<Todo[]>([])

    const {data, error, mutate} = useSWR(
        'todos',
        () => JSON.parse(localStorage.getItem('TODO')!) || [],
    )
    const throwError = useAsyncError()

    if (error) {
        throwError(error)
    }

    useEffect(() => {
        if (!data) return
        setList(data as Todo[])
        filter()
    }, [data])

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

    const updateTodos = async (todos: Todo[]) => {
        localStorage.setItem('TODO', JSON.stringify(todos))
        mutate()
    }

    const numOfTodos = list.filter((elem) => !elem.complete).length

    const value = {
        isLoading: !data,
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
        deleteCompleteTodos() {
            const nextList = list.filter((elem) => !elem.complete)
            setList(nextList)
        },
        update() {
            mutate(updateTodos(list))
        },
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
