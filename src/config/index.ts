import getConfig from 'next/config'

const env = process.env.REACT_APP_ENV

interface Config {
    REACT_APP_ENV: string
    OAUTH: {
        NAVER: {
            CLIENT_ID: string
            CLIENT_SECRET: string
        }
    }
}

const config = getConfig()
const publicRuntimeConfig: Config = config.publicRuntimeConfig

export const HOST_URL = env === 'local' ? 'http://localhost:3000' : '' // real domain

export const {
    REACT_APP_ENV,
    OAUTH: {NAVER},
} = publicRuntimeConfig
