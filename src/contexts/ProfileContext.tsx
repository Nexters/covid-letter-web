import {createContext, ReactNode, useContext, useMemo} from 'react'
import useRequest from 'hooks/useRequest'
import {User} from '$types/response/user'

interface ProfileContextState {
    profile: User | undefined
    reset: () => void
    error: Error | undefined
}

const ProfileContext = createContext<ProfileContextState>({} as ProfileContextState)

export const ProfileProvider = ({children, token}: {children: ReactNode; token?: string}) => {
    const {
        data: profile,
        error,
        mutate: refreshProfile,
    } = useRequest<User>(
        {
            url: '/profile',
            headers: {
                Authorization: token,
            },
        },
        {
            revalidateOnMount: !!token,
            shouldRetryOnError: false,
            initialData: token ? undefined : ({} as User),
        },
    )

    const value = useMemo(
        () => ({
            profile,
            reset() {
                refreshProfile()
            },
            error,
        }),
        [profile, refreshProfile, error],
    )

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext)

    if (!context) {
        throw new Error(`You need to wrap ProfileProvider.`)
    }

    return context
}
