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

const Title = styled.div`
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

const BottomFixed = styled.div`
    position: ${({isMobile}: {isMobile: boolean}) => (isMobile ? 'relative' : 'absolute')};
    bottom: 0;
    left: 0;
    right: 0;
`

const Img = styled.div`
    margin-top: 7.8rem;
`

const Intro = styled.div`
    background-color: rgba(246, 244, 232, 0.8);
    border-radius: 2.4rem 2.4rem 0px 0px;
    padding: 3.6rem 2.4rem 2.4rem;
`

const introTitleTw = tw`
    tw-text-xl tw-font-ohsquare-air tw-text-grey-800
`

const IntroContent = styled.div`
    padding: ${({isMobile}: {isMobile: boolean}) => (isMobile ? '2.4rem 0 13.6rem' : '2.4rem 0 3.2rem')};
`

const introContentTw = tw`
    tw-text-base tw-font-nanumBarunGothic tw-font-normal tw-text-grey-600
`

const ButtonContainer = styled.div`
    ${({isMobile}) =>
        isMobile &&
        `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
    `}
    button {
        border-radius: ${({isMobile}) => (isMobile ? '0' : '0.4rem')};
    }
    button + button {
        margin-top: ${({isMobile}: {isMobile: boolean}) => (isMobile ? '0' : '1.1rem')};
    }
`

const Login = ({isMobile}: {isMobile: boolean}) => {
    return (
        <Container>
            <Title css={{...titleTw, ...commonTw}}>
                나에게 보내는 편지
                <br />
                ‘코로나’편
            </Title>
            <SubTitle css={{...subtitleTw, ...commonTw}}>어려운 시기, 미래의 나에게 마음을 담아 전해요.</SubTitle>
            <BottomFixed isMobile={isMobile}>
                <Img css={commonTw}>
                    <SvgLogin />
                </Img>
                <Intro>
                    <div css={introTitleTw}>온전히 나에게 집중하는 시간...</div>
                    <IntroContent css={introContentTw} isMobile={isMobile}>
                        이 서비스는 시끄러운 외부 환경에서 벗어나 스스로를 돌아보고 돌볼 수 있는 시간을 제공하는
                        플랫폼이에요. 삶에 대한 깊이있는 질문에 답하기를 통해 자신의 생각을 정리하고 오직 자신에게
                        집중하는 순간을 느껴보세요. 세상에 너무 많은 정보와 네트워킹이 범람하는 요즘, 많은 사람들이
                        인생에서 가장 중요한 것은 바로 자신이라는 사실을 잊어버리곤 한답니다. 나에게 쓰는 편지는 이처럼
                        가장 소중한 자신을 이해하고 알아가는 과정을 제시해줍니다.
                    </IntroContent>
                    <ButtonContainer isMobile={isMobile}>
                        <NaverLoginButton returnUrl={ROUTES.COVID.MAIN} isMobile={isMobile} />
                        <GoogleLoginButton returnUrl={ROUTES.COVID.MAIN} isMobile={isMobile} />
                    </ButtonContainer>
                </Intro>
            </BottomFixed>
        </Container>
    )
}

export default Login
