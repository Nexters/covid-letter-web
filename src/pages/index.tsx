import ErrorBoundary, {FallbackProps} from '$components/ErrorBoundary'
import Button from '$components/Button'
import {withAxios} from '$utils/fetcher/withAxios'
import {HOST_URL} from '$config'
import {AuthorizeResponse} from '$types/login/naver'
import ROUTES from '$constants/routes'

const Fallback = ({error}: FallbackProps) => {
    return (
        <h4 style={{backgroundColor: '#f7c5c5', padding: '10px 15px'}}>
            시스템 오류가 발생했습니다. 잠시 후 시도해주세요.
        </h4>
    )
}

function Login() {
    const handleLogin = async (source: string) => {
        const res = await withAxios<AuthorizeResponse>({
            url: '/login/naver/authorize',
            method: 'get',
            params: {
                redirect_uri: encodeURIComponent(
                    `${HOST_URL}${ROUTES.LOGIN.BRIDGE}/${source}`,
                ),
            },
        })

        const {result} = res.data

        const {redirectUrl} = result
        window.location.replace(redirectUrl)
    }
    return (
        <ErrorBoundary withChildren fallback={Fallback}>
            <Button onClick={() => handleLogin('naver')}>
                네이버로 로그인
            </Button>
        </ErrorBoundary>
    )
}

export default Login
