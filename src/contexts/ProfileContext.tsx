import {Profile, ProfileResponse} from '$types/login/naver'
import {createContext, ReactNode, useContext, useMemo} from 'react'
import useRequest from 'hooks/useRequest'

interface ProfileContextState {
    profile: Partial<Profile> | undefined
    reset: () => void
    error: Error | undefined
}

const ProfileContext = createContext<ProfileContextState>(
    {} as ProfileContextState,
)

export const ProfileProvider = ({children}: {children: ReactNode}) => {
    const {
        data: profile,
        error,
        mutate: refreshProfile,
    } = useRequest<ProfileResponse>(
        {
            url: '/login/naver/profile',
        },
        {
            revalidateOnMount: true,
        },
    )

    const value = useMemo(
        () => ({
            profile: profile?.result.response,
            reset() {
                refreshProfile()
            },
            error,
        }),
        [profile, refreshProfile, error],
    )

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext)

    if (!context) {
        throw new Error(`You need to wrap UserProvider.`)
    }

    return context
}
