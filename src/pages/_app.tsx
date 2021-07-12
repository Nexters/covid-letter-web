import '../styles/globals.css'
import App, {AppInitialProps} from 'next/app'
import React from 'react'
import {SWRConfig} from 'swr'
import ErrorBoundary from '$components/ErrorBoundary'

type AppProps = AppInitialProps

class Page extends App<AppProps> {
    render() {
        const {Component, pageProps} = this.props

        return (
            <ErrorBoundary>
                <SWRConfig value={{revalidateOnFocus: false}}>
                    <Component {...pageProps} />
                </SWRConfig>
            </ErrorBoundary>
        )
    }
}
export default Page
