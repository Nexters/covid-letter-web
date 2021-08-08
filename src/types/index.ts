import {PropsWithChildren} from 'react'

export type PropsWithAccessToken<T> = PropsWithChildren<T & {token: string; isGoogleLogin: boolean}>
