/* eslint-disable @typescript-eslint/no-explicit-any */
import {PropsWithChildren} from 'react'

export type PropsFromApp<T> = PropsWithChildren<T & {token: string; isGoogleLogin: boolean; isMobile: boolean}>

export type ValueMap = {
    [key: string]: any
}
