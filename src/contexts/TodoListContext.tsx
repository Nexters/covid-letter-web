import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import useAsyncError from '$hooks/useAsyncError'
import {Todo} from '$types/response/todo'

import useSWR from 'swr'

export interface TodoListContextState {
    isLoading: boolean
    numOfTodos: number
    numOfIncompleteTodos: number
    list: Todo[]
    toggle: (id: number | string) => void
    delete: (id: number | string) => void
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
    const [filteredList, setFilteredList] = useState<Todo[]>([])

    const {
        data: list,
        error,
        mutate,
    } = useSWR<Todo[]>(
        'todos',
        () => JSON.parse(localStorage.getItem('TODO')!) || [],
    )
    const throwError = useAsyncError()

    if (error) {
        throwError(error)
    }

    useEffect(() => {
        if (!list) return
        filter()
    }, [list])

    const [activeTag, setActiveTag] = useState<FilterBase>(FilterBase.ALL)

    const findTodoItemIndex = (id: number | string) => {
        const index = list!.findIndex(
            ({id: todoId}: Pick<Todo, 'id'>) => todoId === id,
        )
        if (index < 0) {
            throw Error('Not found index in TodoList')
        }
        return index
    }

    const filter = () => {
        if (activeTag === FilterBase.ALL) {
            setFilteredList(list!)
            return
        }
        const base = activeTag === FilterBase.COMPLETE ? true : false
        const nextList = list!.filter(({complete}) => complete === base)
        setFilteredList(nextList)
    }

    useEffect(() => {
        if (!list) return
        filter()
    }, [activeTag])

    const updateTodos = (todos: Todo[]) => {
        localStorage.setItem('TODO', JSON.stringify(todos))
        return todos
    }

    const numOfTodos = list?.length || 0

    const value = {
        isLoading: !list,
        numOfTodos,
        numOfIncompleteTodos:
            list?.filter((elem) => !elem.complete).length || 0,
        list: filteredList,
        toggle(id: number | string) {
            const index = findTodoItemIndex(id)
            const nextList: Todo[] = JSON.parse(JSON.stringify(list))
            const prev = nextList[index].complete
            nextList[index].complete = !prev
            mutate(nextList, false)
        },
        delete(id: number | string) {
            const index = findTodoItemIndex(id)
            const nextList: Todo[] = JSON.parse(JSON.stringify(list))
            nextList.splice(index, 1)
            mutate(nextList, false)
        },
        insert(title: string) {
            const newTodo: Todo = {
                title,
                id: Math.random().toString(36).substr(2, 11),
                complete: false,
            }
            const nextList = [...list!, newTodo]
            mutate(nextList, false)
        },
        isEmptyTodoList: list ? list.length < 1 : true,
        filter(tag: FilterBase) {
            setActiveTag(tag)
        },
        activeTag,
        deleteCompleteTodos() {
            const nextList = list!.filter((elem) => !elem.complete)
            mutate(nextList, false)
        },
        update() {
            mutate(updateTodos(list!))
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
