import ErrorBoundary, {FallbackProps} from '$components/ErrorBoundary'
import Button from '$components/Button'
import {withAxios} from '$utils/fetcher/withAxios'
import {HOST_URL} from '$config'
import {AuthorizeResponse} from '$types/login/naver'
import ROUTES from '$constants/routes'
import {NextPageContext} from 'next'
import cookies from 'next-cookies'
import Router from 'next/router'

const Fallback = ({error}: FallbackProps) => {
    return (
        <h4 style={{backgroundColor: '#f7c5c5', padding: '10px 15px'}}>
            시스템 오류가 발생했습니다. 잠시 후 시도해주세요.
        </h4>
    )
}

function Login() {
    const handleLogin = async () => {
        const res = await withAxios<AuthorizeResponse>({
            url: '/login/naver/authorize',
            method: 'get',
            params: {
                redirect_uri: encodeURIComponent(
                    `${HOST_URL}${ROUTES.LOGIN.BRIDGE}`,
                ),
            },
        })

        const {result} = res.data

        const {redirectUrl} = result
        window.location.replace(redirectUrl)
    }
    return (
        <ErrorBoundary withChildren fallback={Fallback}>
            <Button onClick={handleLogin}>네이버로 로그인</Button>
        </ErrorBoundary>
    )
}

Login.getInitialProps = async (ctx: NextPageContext) => {
    const {at} = cookies(ctx)

    console.log(at)

    if (at) {
        if (ctx.req && ctx.res) {
            ctx.res!.writeHead(302, {Location: ROUTES.MAIN})
            ctx.res!.end()
        } else {
            Router.push(ROUTES.MAIN)
        }
    }
    return {}
}

export default Login
