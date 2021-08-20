import getConfig from 'next/config'

const env = process.env.NEXT_PUBLIC_ENV

interface Config {
    NEXT_PUBLIC_ENV: string
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

export const HOST_URL = env === 'local' ? 'http://localhost:3000' : 'https://covid-letter-web.vercel.app' // real domain

export const ORIGIN_DOMAIN = env === 'local' ? 'http://localhost' : 'https://covid-letter-web.vercel.app'

export const {
    NEXT_PUBLIC_ENV,
    API_URL_BASE,
    OAUTH: {NAVER, GOOGLE},
} = publicRuntimeConfig
