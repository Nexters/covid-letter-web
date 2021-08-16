import {useLocalObservable} from 'mobx-react-lite'
import {createContext, ReactNode, useContext} from 'react'
import {AlertState, createAlert} from 'stores/Alert'
import {createLetter, LetterState} from '../stores/Letter'

interface StoreContextState {
    alertStore: AlertState
    letterStore: LetterState
}

const StoreContext = createContext({} as StoreContextState)

export const StoreProvider = ({children}: {children: ReactNode}) => {
    return (
        <StoreContext.Provider
            value={{
                alertStore: useLocalObservable(createAlert),
                letterStore: useLocalObservable(createLetter),
            }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useAlertStore = () => useContext(StoreContext).alertStore
export const useLetterStore = () => useContext(StoreContext).letterStore
