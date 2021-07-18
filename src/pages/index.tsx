import ErrorBoundary, {FallbackProps} from '$components/ErrorBoundary'
import {withAxios} from '$utils/fetcher/withAxios'
import {GOOGLE, HOST_URL} from '$config'
import {AuthorizeResponse} from '$types/login/naver'
import ROUTES from '$constants/routes'
import useAsyncError from '$hooks/useAsyncError'
import {Button} from 'antd'
import {GoogleLoginResponse, useGoogleLogin} from 'react-google-login'
import {SessionToken} from './api/mock/session'

const Fallback = ({error}: FallbackProps) => {
    return (
        <h4 style={{backgroundColor: '#f7c5c5', padding: '10px 15px'}}>
            시스템 오류가 발생했습니다. 잠시 후 시도해주세요.
        </h4>
    )
}

const LoginButton = ({source, text}: {source: string; text: string}) => {
    const throwError = useAsyncError()
    const handleLogin = async () => {
        try {
            const res = await withAxios<AuthorizeResponse>({
                url: `/login/${source}/authorize`,
                method: 'get',
                params: {
                    redirect_uri: encodeURIComponent(
                        `${HOST_URL}${ROUTES.LOGIN.BRIDGE}/${source}`,
                    ),
                },
            })

            const {redirectUrl} = res
            window.location.replace(redirectUrl)
        } catch (e) {
            throwError(e)
        }
    }
    return (
        <Button type={'primary'} block onClick={() => handleLogin()}>
            {text}로 로그인
        </Button>
    )
}

const GoogleLogin = () => {
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

function Login() {
    return (
        <ErrorBoundary withChildren fallback={Fallback}>
            <LoginButton text={'네이버'} source={'naver'} />
            <GoogleLogin />
        </ErrorBoundary>
    )
}

export default Login
