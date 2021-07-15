import '../styles/globals.css'
import App, {AppInitialProps} from 'next/app'
import React, {ErrorInfo} from 'react'
import {SWRConfig} from 'swr'
import {
    isInstanceOfCommonApiError,
    isInstanceOfRedirectArror,
} from '$utils/fetcher/ApiError'
import {apiErrorHandler} from '$utils/fetcher/apiErrorHandler'
import Head from 'next/head'
import ErrorPage from 'next/error'
import {UserProvider} from 'contexts/UserContext'
import {Todo, TodoListProvider} from 'contexts/TodoListContext'

type AppProps = AppInitialProps

interface State {
    error: Error | null
}

class Page extends App<AppProps> {
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
            isInstanceOfRedirectArror(error)
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

        const defaultTodoList: Todo[] = [
            {
                id: 0,
                title: '넥스터즈 TodoList 만들기',
                complete: false,
            },
            {
                id: 1,
                title: 'react native 스터디 (20:00)',
                complete: false,
            },
        ]

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
                    <TodoListProvider intialData={defaultTodoList}>
                        <Component {...pageProps} />
                    </TodoListProvider>
                </SWRConfig>
            </>
        )
    }
}

export default Page
