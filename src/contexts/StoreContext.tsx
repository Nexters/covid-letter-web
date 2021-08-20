import {useLocalObservable} from 'mobx-react-lite'
import {createContext, ReactNode, useContext} from 'react'
import {AlertState, createAlert} from 'stores/Alert'
import {AuthStoreState, createAuthStore} from 'stores/Auth'
import {createLetter, LetterState} from '../stores/Letter'

interface StoreContextState {
    alertStore: AlertState
    letterStore: LetterState
    authStore: AuthStoreState
}

const StoreContext = createContext({} as StoreContextState)

export const StoreProvider = ({children}: {children: ReactNode}) => {
    return (
        <StoreContext.Provider
            value={{
                alertStore: useLocalObservable(createAlert),
                letterStore: useLocalObservable(createLetter),
                authStore: useLocalObservable(createAuthStore),
            }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useAlertStore = () => useContext(StoreContext).alertStore
export const useLetterStore = () => useContext(StoreContext).letterStore
export const useAuthStore = () => useContext(StoreContext).authStore
