import NaverLoginButton from '$components/login/NaverLoginButton'
import GoogleLoginButton from '$components/login/GoogleLoginButton'
import ROUTES from '$constants/routes'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const Container = styled.div``

const Titile = styled.div`
    padding-top: 80px;
`
const titleTwStyles = tw`
    tw-flex tw-text-center tw-flex-1 tw-justify-center tw-items-center
`

const Login = () => {
    return (
        <Container>
            <Titile css={titleTwStyles}>
                나에게 보내는 편지
                <br />
                ‘코로나’편
            </Titile>
            <NaverLoginButton returnUrl={ROUTES.COVID.MAIN} />
            <GoogleLoginButton returnUrl={ROUTES.COVID.MAIN} />
        </Container>
    )
}

export default Login
