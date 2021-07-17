import ROUTES from '$constants/routes'
import {GrantType} from '$constants'
import {ProfileResponse, TokenResponse} from '$types/login/naver'
import {withAxios} from '$utils/fetcher/withAxios'
import {NextPageContext} from 'next'
import Router from 'next/router'
import {SessionToken} from 'pages/api/mock/session'

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
                grant_type: GrantType.create,
            },
        })

        const {error, error_description, access_token} = tokenResult

        if (!error) {
            const profileData = await withAxios<ProfileResponse>({
                url: '/login/naver/profile',
                method: 'POST',
                data: {
                    access_token,
                },
            })

            if (profileData) {
                /**
                 * @todo BE로 프로필 정보 전송 + jwt 받아서 cookie에 저장
                 */
                const sessionResult = await withAxios<SessionToken>({
                    url: '/mock/session',
                    method: 'POST',
                    data: {
                        profile: profileData,
                    },
                })

                if (sessionResult) {
                    const {token, expires_in} = sessionResult

                    res?.setHeader(
                        'Set-Cookie',
                        `letterLogin=${token}; path=/; max-age=${expires_in} HttpOnly`,
                    )
                    if (res && req) {
                        res!.writeHead(302, {Location: ROUTES.MAIN})
                        res!.end()
                    } else {
                        Router.push(ROUTES.MAIN)
                    }
                }
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
