import ROUTES from '$constants/routes'
import {isSSR} from '$utils/env'
import {ServerResponse} from 'http'
import {ApiError, isInstanceOfAccessTokenError, isInstanceOfCommonApiError, isInstanceOfRedirectArror} from './ApiError'

export function apiErrorHandler(e: ApiError) {
    if (!isInstanceOfCommonApiError(e) && !isInstanceOfRedirectArror(e) && !isInstanceOfAccessTokenError(e)) {
        throw e
    }

    if (isSSR) {
        throw new Error('apiErrorHandler는 클라이언트에서 사용 가능합니다.')
    }

    if (isInstanceOfRedirectArror(e) || isInstanceOfAccessTokenError(e)) {
        const redirectUrl = e.redirect

        if (!redirectUrl) {
            throw new Error('Api Error에 redirect 메서드가 필요합니다.')
        }

        window.location.replace(redirectUrl())
    }
}

export function apiServerErrorHandler(e: ApiError, {res}: {res: ServerResponse}) {
    if (!isInstanceOfCommonApiError(e) && !isInstanceOfRedirectArror(e) && !isInstanceOfAccessTokenError(e)) {
        throw e
    }

    if (isInstanceOfRedirectArror(e) || isInstanceOfAccessTokenError(e)) {
        const redirectUrl = e.redirect

        if (!redirectUrl) {
            throw new Error('Api Error에 redirect 메서드가 필요합니다.')
        }

        const url = redirectUrl(ROUTES.ROOT)

        res.writeHead(307, {Location: url})
        res.end()
    }
}
