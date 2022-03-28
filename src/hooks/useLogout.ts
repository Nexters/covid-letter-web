import {useGoogleLogout} from 'react-google-login'
import {GOOGLE} from '$config'
import {withAxios} from '$utils/fetcher/withAxios'
import {noop} from '$utils/index'

const useLogout = (isGoogleLogin: boolean) => {
    const requestLogout = async () => {
        await withAxios<string>({
            url: `/logout`,
        })
    }

    const {signOut} = useGoogleLogout({
        clientId: GOOGLE.CLIENT_ID,
        onLogoutSuccess: noop,
        onFailure: () => {
            console.error('구글 계정 로그아웃에 실패했습니다.')
        },
    })

    return () => {
        if (isGoogleLogin) {
            signOut()
        }

        requestLogout()
    }
}

export default useLogout
