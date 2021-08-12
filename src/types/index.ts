/* eslint-disable @typescript-eslint/no-explicit-any */
import {PropsWithChildren} from 'react'

export type PropsWithAccessToken<T> = PropsWithChildren<T & {token: string; isGoogleLogin: boolean}>

export interface ValueMap {
    [key: string]: any
}
