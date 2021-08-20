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

export const HOST_URL = 'http://localhost:3000'

export const ORIGIN_DOMAIN = env === 'local' ? 'http://localhost' : 'http://110.165.17.179'

export const {
    NEXT_PUBLIC_ENV,
    API_URL_BASE,
    OAUTH: {NAVER, GOOGLE},
} = publicRuntimeConfig
