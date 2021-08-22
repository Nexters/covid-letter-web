import {GRANT_TYPE} from '$constants'
import {ProfileResponse, TokenResponse} from '$types/login/naver'
import {LoginToken} from '$types/response/login'
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
    const {code, state, returnUrl} = query

    try {
        if (code && state) {
            const tokenResult = await withAxios<Partial<TokenResponse>>({
                url: `/login/naver/token`,
                method: 'post',
                data: {
                    code,
                    state,
                    grant_type: GRANT_TYPE.create,
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
                    const {name, email, id} = profileData.response
                    const sessionResult = await withAxios<LoginToken>({
                        url: '/login',
                        method: 'POST',
                        data: {
                            name,
                            email,
                            identifier: id,
                        },
                    })

                    if (sessionResult) {
                        const {accessToken, tokenExpirationTime} = sessionResult

                        res?.setHeader(
                            'Set-Cookie',
                            `letterLogin=${accessToken}; path=/; max-age=${tokenExpirationTime} HttpOnly`,
                        )
                        if (res && req) {
                            res!.writeHead(302, {Location: returnUrl})
                            res!.end()
                        } else {
                            Router.push(returnUrl as string)
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
    } catch (error) {
        return {
            error: error?.message || JSON.stringify(error),
            error_description: '네이버 로그인 실패',
        }
    }
}

export default LoginBridge
