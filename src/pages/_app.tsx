import '../styles/globals.css'
import App, {AppContext, AppInitialProps} from 'next/app'
import React, {ErrorInfo} from 'react'
import {SWRConfig} from 'swr'
import {
    isInstanceOfAccessTokenError,
    isInstanceOfCommonApiError,
    isInstanceOfRedirectArror,
} from '$utils/fetcher/ApiError'
import {apiErrorHandler} from '$utils/fetcher/apiErrorHandler'
import Head from 'next/head'
import ErrorPage from 'next/error'
import {UserProvider} from '$contexts/UserContext'
import ROUTES from '$constants/routes'
import cookies from 'next-cookies'
import Router from 'next/router'

type AppProps = AppInitialProps

interface State {
    error: Error | null
}

type ACCESS_TOKEN = string | undefined

const needToCheckCookiePath = (pathname: string) => {
    const needLogin = [ROUTES.MAIN].includes(pathname)
    const needMain = [ROUTES.ROOT].includes(pathname)
    return {
        needToCheckCookie: needLogin || needMain,
        redirectUrl: needLogin ? ROUTES.ROOT : ROUTES.MAIN,
        compare: (v: ACCESS_TOKEN) => (needLogin ? !v : v),
    }
}

class Page extends App<AppProps> {
    static async getInitialProps({
        ctx,
        Component: {getInitialProps: getComponentIntialProps},
    }: AppContext): Promise<AppProps> {
        try {
            const {access_token} = cookies(ctx)
            const {needToCheckCookie, redirectUrl, compare} =
                needToCheckCookiePath(ctx.pathname)

            if (needToCheckCookie) {
                if (compare(access_token)) {
                    if (ctx.req && ctx.res) {
                        ctx.res!.writeHead(302, {Location: redirectUrl})
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
                token: access_token,
            }
            return {
                pageProps,
            }
        } catch (e) {
            return {
                pageProps: {},
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
                    <UserProvider>
                        <Component {...pageProps} />
                    </UserProvider>
                </SWRConfig>
            </>
        )
    }
}

export default Page
