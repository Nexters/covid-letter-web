import {RESPONSE} from '$constants/index'
import {ResponseCode} from '$types/response'

export class ApiError extends Error {
    code?: ResponseCode
    redirect?: (url: string) => string
}

export class CommonApiError extends ApiError {
    code = RESPONSE.ERROR
    redirect = (url: string) => url
}

export const isInstanceOfCommonApiError = (e: unknown): e is CommonApiError =>
    e instanceof CommonApiError
