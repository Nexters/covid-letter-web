import {withAxios} from '$utils/fetcher/withAxios'
import {GOOGLE} from '$config'
import {GoogleLoginResponse, useGoogleLogin} from 'react-google-login'
import {SessionToken} from 'pages/api/mock/session'
import tw from 'twin.macro'
import styled from '@emotion/styled'
import SvgGoogle from 'assets/GoogleLogo'

const commonTw = tw`
    tw-flex tw-text-center tw-flex-1 tw-justify-center tw-items-center
`

const Button = styled.button`
    width: 100%;
    padding: ${({isMobile}: {isMobile: boolean}) => (isMobile ? '1.65rem 0' : '1.85rem 0')};
    color: #fff;
    background-color: #dc4e41;
    border: 1px solid #dc4e41;
`

const buttonTw = tw`
tw-font-ohsquare tw-font-bold tw-text-base
`

interface GoogleLoginButtonProps {
    returnUrl: string
    isMobile: boolean
}

const GoogleLoginButton = ({returnUrl, isMobile}: GoogleLoginButtonProps) => {
    const onSuccess = async ({googleId, profileObj}: Partial<GoogleLoginResponse>) => {
        const profile = {
            id: googleId,
            email: profileObj?.email,
            name: profileObj?.name,
        }
        /**
         * @todo BE로 프로필 정보 전송 + jwt 받아서 cookie에 저장
         */
        const sessionResult = await withAxios<SessionToken>({
            url: '/mock/session',
            method: 'POST',
            data: {
                profile,
            },
        })

        if (sessionResult) {
            const {accessToken, tokenExpirationTime} = sessionResult

            const redirectUrl = await withAxios<string>({
                url: '/login/google/cookie',
                method: 'POST',
                data: {
                    accessToken,
                    tokenExpirationTime,
                    returnUrl,
                },
            })

            window.location.replace(redirectUrl)
        }
    }
    const onFailure = (error: unknown) => {
        console.error(error)
    }
    const {signIn} = useGoogleLogin({
        clientId: GOOGLE.CLIENT_ID,
        onSuccess,
        onFailure,
    })
    return (
        <Button css={{...buttonTw, ...commonTw}} onClick={signIn} isMobile={isMobile}>
            <SvgGoogle style={{marginRight: '24px'}} />
            Google로 계속하기
        </Button>
    )
}

export default GoogleLoginButton
