import NaverLoginButton from '$components/login/NaverLoginButton'
import GoogleLoginButton from '$components/login/GoogleLoginButton'
import ROUTES from '$constants/routes'

const Login = () => {
    return (
        <>
            <NaverLoginButton returnUrl={ROUTES.COVID.MAIN} />
            <GoogleLoginButton returnUrl={ROUTES.COVID.MAIN} />
        </>
    )
}

export default Login
