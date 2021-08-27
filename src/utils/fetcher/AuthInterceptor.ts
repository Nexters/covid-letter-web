import {AxiosError, AxiosResponse} from 'axios'
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {AccessTokenError, CommonApiError, RedirectArror} from './ApiError'

/**
 * @todo 회원 인증 에러 추가
 */
export function resolveInterceptor<T>(res: AxiosResponse<Response<T>>): T {
    const code = res.data.code

    switch (code) {
        case RESPONSE.INVALID_ACCESS_TOKEN:
            throw new AccessTokenError()
        case RESPONSE.ERROR:
            throw new CommonApiError()
        case RESPONSE.REDIRECT:
            throw new RedirectArror()
        default:
            return res.data.result
    }
}

class ErrorTable {
    statusCode?: number
    cookie?: string
    requestUrl?: string
    constructor(statusCode?: number, cookie?: string, requestUrl?: string) {
        this.statusCode = statusCode
        this.cookie = cookie
        this.requestUrl = requestUrl
    }
}

export function rejectInterceptor(error: AxiosError) {
    const statusCode = error.response?.status
    const {headers, url} = error.config
    const errorTable = new ErrorTable(statusCode, headers?.Authorization, url)

    console.table(errorTable)
    throw error
}
