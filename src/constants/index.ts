import {ResponseCode} from 'types/response'

export const RESPONSE: {[key in string]: ResponseCode} = {
    NORMAL: '00',
    ERROR: '99',
    REDIRECT: '01',
}

export enum GrantType {
    create = 'authorization_code',
    refresh = 'refresh_token',
    delete = 'delete',
}
