import {AxiosResponse} from 'axios'
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {CommonApiError, RedirectArror} from './ApiError'

/**
 * @todo 회원 인증 에러 추가
 */
export function AuthInterceptor<T>(res: AxiosResponse<Response<T>>): T {
    const code = res.data.code

    if (code === RESPONSE.ERROR) {
        throw new CommonApiError()
    }

    if (code === RESPONSE.REDIRECT) {
        throw new RedirectArror()
    }

    return res.data.result
}
