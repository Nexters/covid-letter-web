import {AxiosResponse} from 'axios'
import {RESPONSE} from '$constants'
import {Response} from '$types/response'
import {AccessTokenError, CommonApiError, RedirectArror} from './ApiError'

/**
 * @todo 회원 인증 에러 추가
 */
export function AuthInterceptor<T>(res: AxiosResponse<Response<T>>): T {
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
