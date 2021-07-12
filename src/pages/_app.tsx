import '../styles/globals.css'
import App, {AppContext, AppInitialProps} from 'next/app'
import React, {ErrorInfo} from 'react'
import {SWRConfig} from 'swr'
import {
    isInstanceOfCommonApiError,
    isInstanceOfRedirectArror,
} from '$utils/fetcher/ApiError'
import {apiErrorHandler} from '$utils/fetcher/apiErrorHandler'

type AppProps = AppInitialProps

class Page extends App<AppProps> {
    componentDidCatch(error: Error, __: ErrorInfo) {
        /** add common error */
        if (
            isInstanceOfCommonApiError(error) ||
            isInstanceOfRedirectArror(error)
        ) {
            return apiErrorHandler(error)
        }
    }

    render() {
        const {Component, pageProps} = this.props

        return (
            <SWRConfig value={{revalidateOnFocus: false}}>
                <Component {...pageProps} />
            </SWRConfig>
        )
    }
}

export default Page
