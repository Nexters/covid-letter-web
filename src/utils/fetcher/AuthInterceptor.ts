import {AxiosResponse} from 'axios'
import {RESPONSE} from '$constants/index'
import {Response} from '$types/response'
import {CommonApiError, RedirectArror} from './ApiError'

/**
 * @todo 회원 인증 에러 추가
 */
export function AuthInterceptor<T>(
    res: AxiosResponse<Response<T>>,
): AxiosResponse {
    const code = res.data.code

    if (code === RESPONSE.ERROR) {
        throw new CommonApiError()
    }

    if (code === RESPONSE.REDIRECT) {
        throw new RedirectArror()
    }

    return res
}