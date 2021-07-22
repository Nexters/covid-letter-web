import {useLocalObservable} from 'mobx-react-lite'
import {createContext, ReactNode, useContext} from 'react'
import {createTodoListStore, TodoListStore} from 'stores/TodoStore'

interface StoreContextState {
    todoListStore: TodoListStore
}

const StoreContext = createContext({} as StoreContextState)

export const StoreProvider = ({children}: {children: ReactNode}) => (
    <StoreContext.Provider
        value={{
            todoListStore: useLocalObservable(createTodoListStore),
        }}>
        {children}
    </StoreContext.Provider>
)

export const useTodoListStore = () => useContext(StoreContext).todoListStore
