import NaverLoginButton from '$components/login/NaverLoginButton'
import GoogleLoginButton from '$components/login/GoogleLoginButton'
import ROUTES from '$constants/routes'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import SvgLogin from 'assets/LoginBg'

const commonTw = tw`
    tw-flex tw-text-center tw-flex-1 tw-justify-center tw-items-center
`

const Container = styled.div``

const Titile = styled.div`
    padding-top: 8rem;
`
const titleTw = tw`
    tw-text-xl tw-font-ohsquare-air tw-text-primary-green-500 tw-font-light
`

const SubTitle = styled.div`
    margin-top: 1.2rem;
`

const subtitleTw = tw`
    tw-text-sm tw-font-nanumBarunGothic tw-font-light tw-text-grey-700
`

const Img = styled.div`
    margin-top: 7.8rem;
`

const Login = () => {
    return (
        <Container>
            <Titile css={{...titleTw, ...commonTw}}>
                나에게 보내는 편지
                <br />
                ‘코로나’편
            </Titile>
            <SubTitle css={{...subtitleTw, ...commonTw}}>
                어려운 시기, 미래의 나에게 마음을 담아 전해요.
            </SubTitle>
            <Img css={commonTw}>
                <SvgLogin />
            </Img>
            <NaverLoginButton returnUrl={ROUTES.COVID.MAIN} />
            <GoogleLoginButton returnUrl={ROUTES.COVID.MAIN} />
        </Container>
    )
}

export default Login
