import App, {AppInitialProps, AppContext} from 'next/app'
import {ErrorInfo} from 'react'
import {SWRConfig} from 'swr'
import {
    isInstanceOfAccessTokenError,
    isInstanceOfApiError,
    isInstanceOfCommonApiError,
    isInstanceOfRedirectArror,
} from '$utils/fetcher/ApiError'
import {apiErrorHandler, apiServerErrorHandler} from '$utils/fetcher/apiErrorHandler'
import Head from 'next/head'
import ErrorPage from 'next/error'
import ROUTES from '$constants/routes'
import cookies from 'next-cookies'
import Router from 'next/router'
import {ProfileProvider} from '$contexts/ProfileContext'
import {withAxios} from '$utils/fetcher/withAxios'
import {GlobalStyles, styled} from 'twin.macro'
import '../styles/globals.css'
import {StoreProvider} from '$contexts/StoreContext'
import AlertContainer from '$components/alert'
import Device from '$components/device'
import {ToastContainer} from '$components/toast'

const Article = styled.div`
    position: relative;
    min-height: 100%;
`

const Container = styled.div`
    max-width: 420px;
    margin: 0 auto;
    min-height: 100vh;
    position: relative;
`

type AppProps = AppInitialProps

interface State {
    error: Error | null
}

type ACCESS_TOKEN = string | undefined

const needToCheckCookiePath = (pathname: string) => {
    const needLogin = [...Object.values(ROUTES.COVID.LETTER)].includes(pathname)
    const needMain = [ROUTES.ROOT, ROUTES.LOGIN].includes(pathname)

    return {
        needToCheckCookie: needLogin || needMain,
        redirectUrl: needLogin ? ROUTES.LOGIN : ROUTES.ROOT,
        compare: (v: ACCESS_TOKEN) => (needLogin ? !v : v),
        needLogout(v: ACCESS_TOKEN) {
            return needLogin && !v
        },
    }
}
class Page extends App<AppProps> {
    static async getInitialProps({
        ctx,
        Component: {getInitialProps: getComponentIntialProps},
    }: AppContext): Promise<AppProps> {
        try {
            /**
             * @todo jwt 존재여부 검사
             * jwt가 있으면 메인으로 리다이렉트, 없으면 로그인화면으로 리다이렉트
             */
            const {letterLogin, googleLogin} = cookies(ctx)
            const {needToCheckCookie, redirectUrl, compare, needLogout} = needToCheckCookiePath(ctx.pathname)

            if (needToCheckCookie) {
                if (needLogout(letterLogin)) {
                    await withAxios({
                        url: '/logout',
                    })
                }
                if (compare(letterLogin)) {
                    if (ctx.req && ctx.res) {
                        ctx.res!.writeHead(302, {Location: redirectUrl}) // 로그인으로 리다이렉트, 화면 유지
                        ctx.res!.end()
                    } else {
                        Router.push(redirectUrl)
                    }
                }
            }
            const props = await (getComponentIntialProps ? getComponentIntialProps(ctx) : Promise.resolve({}))

            const pageProps = {
                ...props,
                token: letterLogin,
                isGoogleLogin: !!googleLogin,
            }
            return {
                pageProps,
            }
        } catch (error) {
            if (isInstanceOfApiError(error) && ctx.req && ctx.res) {
                apiServerErrorHandler(error, {res: ctx.res})
            }
            return {
                pageProps: {error},
            }
        }
    }
    state: State = {
        error: null,
    }

    static getDerivedStateFromError(error: Error) {
        return {error}
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentDidCatch(error: Error, __: ErrorInfo) {
        /** add common error */
        if (
            isInstanceOfCommonApiError(error) ||
            isInstanceOfRedirectArror(error) ||
            isInstanceOfAccessTokenError(error)
        ) {
            return apiErrorHandler(error)
        }
    }

    render() {
        const {Component, pageProps} = this.props
        const {error} = this.state

        if (error) {
            return <ErrorPage statusCode={500} />
        }

        return (
            <>
                <Head>
                    <title>Covid Letter Web</title>
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <SWRConfig value={{revalidateOnFocus: false}}>
                    <StoreProvider>
                        <ProfileProvider token={pageProps.token}>
                            <GlobalStyles />
                            <Device>
                                {({isMobileOnly: isMobile}) => {
                                    return (
                                        <Article className="tw-bg-beige-200">
                                            <Container className="tw-bg-beige-300">
                                                <Component isMobile={isMobile} {...pageProps} />
                                            </Container>
                                        </Article>
                                    )
                                }}
                            </Device>
                            <AlertContainer />
                            <ToastContainer />
                        </ProfileProvider>
                    </StoreProvider>
                </SWRConfig>
            </>
        )
    }
}

export default Page
