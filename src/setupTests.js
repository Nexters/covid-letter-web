import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import {cleanup} from '@testing-library/react'

jest.mock('next/config', () => () => {
    const config = jest.requireActual('next/config')

    return {
        ...config,
        publicRuntimeConfig: {
            REACT_APP_ENV: 'local',
            OAUTH: {
                NAVER: {
                    CLIENT_ID: 'naver-client-id',
                    CLIENT_SECRET: 'naver-client-secret',
                },
                GOOGLE: {
                    CLIENT_ID: 'google-client-id',
                    API_KEY: 'google-api-key',
                },
            },
        },
    }
})

jest.mock('next/router', () => {
    const actualRouter = jest.requireActual('next/router')
    return {
        ...actualRouter,
        basePath: '/',
        pathname: '/',
        route: '/',
        asPath: '/',
        query: {},
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn().mockResolvedValue(undefined),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        isLocaleDomain: false,
        isReady: true,
        isPreview: false,
    }
})

beforeAll(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {assign: jest.fn()},
    })

    Element.prototype.scrollTo = jest.fn()

    window.alert = jest.fn()
    window.confirm = jest.fn()
})

afterEach(() => {
    cleanup()
})
