import '../styles/globals.css'
import App, {AppContext, AppInitialProps} from 'next/app'
import React, {ErrorInfo} from 'react'
import {SWRConfig} from 'swr'
import {
    isInstanceOfAccessTokenError,
    isInstanceOfApiError,
    isInstanceOfCommonApiError,
    isInstanceOfRedirectArror,
} from '$utils/fetcher/ApiError'
import {
    apiErrorHandler,
    apiServerErrorHandler,
} from '$utils/fetcher/apiErrorHandler'
import Head from 'next/head'
import ErrorPage from 'next/error'
import ROUTES from '$constants/routes'
import cookies from 'next-cookies'
import Router from 'next/router'
import {ProfileProvider} from '$contexts/ProfileContext'
import {withAxios} from '$utils/fetcher/withAxios'

type AppProps = AppInitialProps

interface State {
    error: Error | null
}

type ACCESS_TOKEN = string | undefined

const needToCheckCookiePath = (pathname: string) => {
    const needLogin = [ROUTES.MAIN, ROUTES.POST].includes(pathname)
    const needMain = [ROUTES.ROOT].includes(pathname)
    return {
        needToCheckCookie: needLogin || needMain,
        redirectUrl: needLogin ? ROUTES.ROOT : ROUTES.MAIN,
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
            const {letterLogin} = cookies(ctx)
            const {needToCheckCookie, redirectUrl, compare, needLogout} =
                needToCheckCookiePath(ctx.pathname)

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
            const props = await (getComponentIntialProps
                ? getComponentIntialProps(ctx)
                : Promise.resolve({}))

            const pageProps = {
                ...props,
                token: letterLogin,
            }
            return {
                pageProps,
            }
        } catch (error) {
            if (isInstanceOfApiError(error) && ctx.req && ctx.res) {
                apiServerErrorHandler(error, {req: ctx.req, res: ctx.res})
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
                    <ProfileProvider token={pageProps.token}>
                        <Component {...pageProps} />
                    </ProfileProvider>
                </SWRConfig>
            </>
        )
    }
}

export default Page
