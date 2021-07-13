import {User} from '$types/response/user'
import {createContext, ReactNode, useContext, useMemo} from 'react'
import useRequest from 'hooks/useRequest'

interface UserContextState {
    user: User | undefined
    reset: (args?: User) => void
    isLoading?: boolean
}

export const UserContext = createContext<UserContextState>(
    {} as UserContextState,
)

export const UserProvider = ({children}: {children: ReactNode}) => {
    const {data: user, mutate: refreshUser} = useRequest<User>(
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

    const value = useMemo(
        () => ({
            user: user?.result,
            reset() {
                refreshUser()
            },
        }),
        [user, refreshUser],
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
