import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

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
