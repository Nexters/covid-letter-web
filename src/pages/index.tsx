import ErrorBoundary, {FallbackProps} from '$components/ErrorBoundary'
import Button from '$components/Button'
import {withAxios} from '$utils/fetcher/withAxios'
import {HOST_URL} from '$config'
import {AuthorizeResponse} from '$types/login/naver'
import ROUTES from '$constants/routes'
import useAsyncError from '$hooks/useAsyncError'

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
    return <Button onClick={() => handleLogin()}>{text}로 로그인</Button>
}

function Login() {
    return (
        <ErrorBoundary withChildren fallback={Fallback}>
            <LoginButton text={'네이버'} source={'naver'} />
        </ErrorBoundary>
    )
}

export default Login
