import {RESPONSE} from '$constants'
import ROUTES from '$constants/routes'
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
    redirect = (url?: string) => url || ROUTES.ROOT
}

export class AccessTokenError extends ApiError {
    code = RESPONSE.INVALID_ACCESS_TOKEN
    message = '[SYSTEM] Access Token is Expired or Invalid'
    redirect = (url?: string) => url || ROUTES.ROOT
}

export const isInstanceOfApiError = (e: unknown): e is ApiError =>
    e instanceof ApiError

export const isInstanceOfCommonApiError = (e: unknown): e is CommonApiError =>
    e instanceof CommonApiError

export const isInstanceOfRedirectArror = (e: unknown): e is RedirectArror =>
    e instanceof RedirectArror

export const isInstanceOfAccessTokenError = (
    e: unknown,
): e is AccessTokenError => e instanceof AccessTokenError
