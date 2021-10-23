import {useProfileContext} from '$contexts/ProfileContext'
import {useAlertStore} from '$contexts/StoreContext'
import {useEffect, useState} from 'react'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'

const useProfileError = (callback: (...args: unknown[]) => void) => {
    const {error} = useProfileContext()
    const {alert} = useAlertStore()
    const router = useRouter()

    const [localError, setLocalError] = useState<Error | undefined>()

    useEffect(() => {
        setLocalError(error)
    }, [error])

    useEffect(() => {
        if (localError) {
            setLocalError(undefined)

            alert({
                title: `로그아웃되었어.\n다시 로그인해줄래?`,
                successText: '다시 로그인할래',
                onSuccess: () => {
                    callback()
                    router.replace(ROUTES.LOGIN)
                },
                onClose: () => {
                    callback()
                    router.replace(ROUTES.LOGIN)
                },
            })
        }
    }, [localError])
}

export default useProfileError
