import ErrorBoundary, {FallbackProps} from '$components/ErrorBoundary'
import NaverLoginButton from '$components/login/NaverLoginButton'
import GoogleLoginButton from '$components/login/GoogleLoginButton'

const Fallback = ({error}: FallbackProps) => {
    return (
        <h4 style={{backgroundColor: '#f7c5c5', padding: '10px 15px'}}>
            시스템 오류가 발생했습니다. 잠시 후 시도해주세요.
        </h4>
    )
}

function Login() {
    return (
        <ErrorBoundary withChildren fallback={Fallback}>
            <NaverLoginButton />
            <GoogleLoginButton />
        </ErrorBoundary>
    )
}

export default Login
