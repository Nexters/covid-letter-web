import {RESPONSE} from '$constants'
import ROUTES from '$constants/routes'
import {GrandType, TokenResponse} from '$types/login/naver'
import {withAxios} from '$utils/fetcher/withAxios'
import {NextPageContext} from 'next'
import Router from 'next/router'

interface LoginBridgeProps {
    error: string | null
    error_description: string
}

const LoginBridge = ({error, error_description}: LoginBridgeProps) => {
    if (error) {
        return <>{error_description}</>
    }
    return null
}

LoginBridge.getInitialProps = async ({req, res, query}: NextPageContext) => {
    const {code, state} = query

    if (code && state) {
        const tokenResult = await withAxios<Partial<TokenResponse>>({
            url: `/login/naver/token`,
            method: 'post',
            data: {
                code,
                state,
                grant_type: GrandType.create,
            },
        })
        const {
            data: {code: resCode, result},
        } = tokenResult

        const {error, error_description} = result

        if (resCode === RESPONSE.NORMAL) {
            const {access_token, expires_in} = result

            res?.setHeader(
                'Set-Cookie',
                `at=${access_token}; path=/; max-age=${expires_in}`,
            )

            if (res && req) {
                res!.writeHead(302, {Location: ROUTES.MAIN})
                res!.end()
            } else {
                Router.push(ROUTES.MAIN)
            }

            return {
                error: 'INVALID_ACCESS',
                error_description: '진입 불가능',
            }
        }
        return {
            error,
            error_description,
        }
    }

    return {
        error: 'AUTHORIZE_ERROR',
        error_description: '네이버 로그인 실패',
    }
}

export default LoginBridge
