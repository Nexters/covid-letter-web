import {ResponseCode} from 'types/response'

export const RESPONSE: {[key in string]: ResponseCode} = {
    NORMAL: '00',
    ERROR: '99',
    REDIRECT: '01',
}

export const GrantType = {
    create: 'authorization_code',
    refresh: 'refresh_token',
    delete: 'delete',
} as const

export type GrantType = typeof GrantType[keyof typeof GrantType]
