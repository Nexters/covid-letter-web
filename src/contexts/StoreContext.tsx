import {useLocalObservable} from 'mobx-react-lite'
import {createContext, ReactNode, useContext} from 'react'
import {AlertState, createAlert} from 'stores/Alert'

interface StoreContextState {
    alertStore: AlertState
}

const StoreContext = createContext({} as StoreContextState)

export const StoreProvider = ({children}: {children: ReactNode}) => {
    return (
        <StoreContext.Provider
            value={{
                alertStore: useLocalObservable(createAlert),
            }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useAlertStore = () => useContext(StoreContext).alertStore
