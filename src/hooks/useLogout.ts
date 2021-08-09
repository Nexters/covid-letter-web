import {useGoogleLogout} from 'react-google-login'
import {GOOGLE} from '$config'
import {withAxios} from '$utils/fetcher/withAxios'
import {useRouter} from 'next/router'

const useLogout = (isGoogleLogin: boolean) => {
    const routes = useRouter()
    const requestLogout = async () => {
        await withAxios<string>({
            url: `/logout`,
        })

        routes.reload()
    }

    const {signOut} = useGoogleLogout({
        clientId: GOOGLE.CLIENT_ID,
        onLogoutSuccess: requestLogout,
        onFailure: () => {
            console.error('구글 계정 로그아웃에 실패했습니다.')
        },
    })

    return () => {
        if (isGoogleLogin) {
            signOut()
            return
        }
        requestLogout()
    }
}

export default useLogout
