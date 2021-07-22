import {Todo} from '$types/response/todo'
import {FilterBase} from 'contexts/TodoListContext'

export interface TodoListStore {
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

export {createTodoListStore}
