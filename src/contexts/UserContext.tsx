import {User} from '$types/response/user'
import {createContext, ReactNode, useContext, useMemo} from 'react'
import useRequest from 'hooks/useRequest'
import useAsyncError from '$hooks/useAsyncError'

interface UserContextState {
    user: User | undefined
    reset: (args?: User) => void
    isLoading?: boolean
    error?: Error
}

export const UserContext = createContext<UserContextState>(
    {} as UserContextState,
)

export const UserProvider = ({children}: {children: ReactNode}) => {
    const {
        data: user,
        error,
        mutate: refreshUser,
    } = useRequest<User>(
        {
            url: '/user',
            params: {
                ok: 1,
            },
        },
        {
            revalidateOnMount: true,
        },
    )

    const throwError = useAsyncError()
    if (error) {
        throwError(error)
    }

    const value = useMemo(
        () => ({
            user,
            reset() {
                refreshUser()
            },
            isLoading: !user,
            error,
        }),
        [user, refreshUser, error],
    )

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error(`You need to wrap UserProvider.`)
    }

    return context
}
