import {Todo} from '$types/response/todo'
import {observer, useLocalObservable} from 'mobx-react-lite'
import {createContext, ReactNode, useContext, useEffect} from 'react'
import useSWR from 'swr'
import {FilterBase, TodoListContextState} from './TodoListContext'

const _TodoListContext = createContext({} as TodoListContextState)

interface TodoListStore {
    list: Todo[]
    setList: (v: Todo[]) => void
    activeTag: FilterBase
    setActiveTag: (v: FilterBase) => void
}

const createTodoListStore = (): TodoListStore => ({
    list: [] as Todo[],
    setList(v: Todo[]) {
        this.list = v
    },
    activeTag: FilterBase.ALL as FilterBase,
    setActiveTag(v: FilterBase) {
        this.activeTag = v
    },
})

export const _TodoListProvider = observer(
    ({intialData, children}: {intialData?: Todo[]; children: ReactNode}) => {
        const {list, setList, activeTag, setActiveTag} =
            useLocalObservable(createTodoListStore)

        const {data, mutate} = useSWR<Todo[]>(
            'todos',
            () => JSON.parse(localStorage.getItem('TODO')!) || [],
        )

        useEffect(() => {
            if (!data) return
            filter()
        }, [data])

        const filter = () => {
            console.log(activeTag)
            if (activeTag === FilterBase.ALL) {
                setList(data || [])
                return
            }
            const base = activeTag === FilterBase.COMPLETE ? true : false
            const nextList = data!.filter(({complete}) => complete === base)
            setList(nextList)
        }

        useEffect(() => {
            if (!data) return
            filter()
        }, [activeTag])

        const findTodoItemIndex = (id: number | string) => {
            const index = data!.findIndex(
                ({id: todoId}: Pick<Todo, 'id'>) => todoId === id,
            )
            if (index < 0) {
                throw Error('Not found index in TodoList')
            }
            return index
        }

        const updateTodos = (todos: Todo[]) => {
            localStorage.setItem('TODO', JSON.stringify(todos))
            return todos
        }

        const value = {
            isLoading: !data,
            numOfTodos: data?.length || 0,
            numOfIncompleteTodos:
                data?.filter((elem) => !elem.complete).length || 0,
            list,
            toggle(id: number | string) {
                const index = findTodoItemIndex(id)
                const nextList: Todo[] = JSON.parse(JSON.stringify(data))
                const prev = nextList[index].complete
                nextList[index].complete = !prev
                mutate(nextList, false)
            },
            delete(id: number | string) {
                const index = findTodoItemIndex(id)
                const nextList: Todo[] = JSON.parse(JSON.stringify(data))
                nextList.splice(index, 1)
                mutate(nextList, false)
            },
            insert(title: string) {
                const newTodo: Todo = {
                    title,
                    id: Math.random().toString(36).substr(2, 11),
                    complete: false,
                }
                const nextList = [...data!, newTodo]
                mutate(nextList, false)
            },
            isEmptyTodoList: data ? data.length < 1 : true,
            filter(tag: FilterBase) {
                setActiveTag(tag)
            },
            activeTag,
            deleteCompleteTodos() {
                const nextList = data!.filter((elem) => !elem.complete)
                mutate(nextList, false)
            },
            update() {
                mutate(updateTodos(data!))
            },
        }

        return (
            <_TodoListContext.Provider value={value}>
                {children}
            </_TodoListContext.Provider>
        )
    },
)

export const _useTodoContext = () => {
    const context = useContext(_TodoListContext)

    return context
}
