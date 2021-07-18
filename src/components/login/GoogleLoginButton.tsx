import {withAxios} from '$utils/fetcher/withAxios'
import {GOOGLE} from '$config'
import {Button} from 'antd'
import {GoogleLoginResponse, useGoogleLogin} from 'react-google-login'
import {SessionToken} from 'pages/api/mock/session'

const GoogleLoginButton = () => {
    const onSuccess = async ({
        googleId,
        profileObj,
    }: Partial<GoogleLoginResponse>) => {
        const profile = {
            id: googleId,
            email: profileObj?.email,
            name: profileObj?.name,
        }
        /**
         * @todo BE로 프로필 정보 전송 + jwt 받아서 cookie에 저장
         */
        const sessionResult = await withAxios<SessionToken>({
            url: '/mock/session',
            method: 'POST',
            data: {
                profile,
            },
        })

        if (sessionResult) {
            const {token, expires_in} = sessionResult

            const redirectUrl = await withAxios<string>({
                url: '/login/google/cookie',
                method: 'POST',
                data: {
                    token,
                    expires_in,
                },
            })

            window.location.replace(redirectUrl)
        }
    }
    const onFailure = (error: unknown) => {
        console.error(error)
    }
    const {signIn} = useGoogleLogin({
        clientId: GOOGLE.CLIENT_ID,
        onSuccess,
        onFailure,
    })
    return (
        <Button block type={'primary'} onClick={signIn}>
            구글로 로그인
        </Button>
    )
}

export default GoogleLoginButton
