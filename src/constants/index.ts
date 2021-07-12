import {ResponseCode} from 'types/response'

export const RESPONSE: {[key in string]: ResponseCode} = {
    NORMAL: '00',
    ERROR: '99',
    REDIRECT: '01',
}
