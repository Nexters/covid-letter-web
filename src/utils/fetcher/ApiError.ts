import {RESPONSE} from '$constants'
import {ResponseCode} from '$types/response'

export class ApiError extends Error {
    code?: ResponseCode
    redirect?: (url: string) => string
}

export class CommonApiError extends ApiError {
    code = RESPONSE.ERROR
    message = '[SYSTEM] Api Error'
}

/**
 * @example 리다이렉트되어야 하는 URL이 있는 에러 클래스
 */
export class RedirectArror extends ApiError {
    code = RESPONSE.REDIRECT
    message = '[SYSTEM] Api Error'
    redirect = () => `https://www.naver.com`
}

export const isInstanceOfCommonApiError = (e: unknown): e is CommonApiError =>
    e instanceof CommonApiError

export const isInstanceOfRedirectArror = (e: unknown): e is RedirectArror =>
    e instanceof RedirectArror
