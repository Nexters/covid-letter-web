import {isSSR} from '$utils/env'
import {clearCookie} from '$utils/index'
import {
    CommonApiError,
    isInstanceOfAccessTokenError,
    isInstanceOfCommonApiError,
    isInstanceOfRedirectArror,
} from './ApiError'

export function apiErrorHandler(e: CommonApiError) {
    if (
        !isInstanceOfCommonApiError(e) &&
        !isInstanceOfRedirectArror(e) &&
        !isInstanceOfAccessTokenError(e)
    ) {
        throw e
    }

    if (isSSR) {
        throw new Error('apiErrorHandler는 클라이언트에서 사용 가능합니다.')
    }

    if (isInstanceOfRedirectArror(e)) {
        const redirectUrl = e.redirect

        if (!redirectUrl) {
            throw new Error('Api Error에 redirect 메서드가 필요합니다.')
        }

        window.location.replace(redirectUrl())
    }

    if (isInstanceOfAccessTokenError(e)) {
        clearCookie()
        const redirectUrl = e.redirect

        if (!redirectUrl) {
            throw new Error('Access Error에 redirect 메서드가 필요합니다.')
        }

        window.location.replace(redirectUrl())
    }
}
