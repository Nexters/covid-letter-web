import getConfig from 'next/config'

const env = process.env.REACT_APP_ENV

interface Config {
    REACT_APP_ENV: string
    API_URL_BASE: string
    OAUTH: {
        NAVER: {
            CLIENT_ID: string
            CLIENT_SECRET: string
        }
        GOOGLE: {
            CLIENT_ID: string
            API_KEY: string
        }
    }
}

const config = getConfig()
const publicRuntimeConfig: Config = config.publicRuntimeConfig

export const HOST_URL = env === 'local' ? 'http://localhost' : 'https://covid-letter-web.vercel.app' // real domain

export const {
    REACT_APP_ENV,
    API_URL_BASE,
    OAUTH: {NAVER, GOOGLE},
} = publicRuntimeConfig
