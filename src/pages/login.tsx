import NaverLoginButton from '$components/login/NaverLoginButton'
import GoogleLoginButton from '$components/login/GoogleLoginButton'
import ROUTES from '$constants/routes'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import SvgLogin from 'assets/LoginBg'
import {FlexCenter} from '$styles/utils/layout'
import {FontNanumBarunGothic, FontOhsquareAir} from '$styles/utils/font'

const Container = styled.div``

const Title = styled.div`
    ${FlexCenter}
    ${FontOhsquareAir}
    ${tw`tw-text-center tw-text-xl tw-text-primary-green-500`}
    padding-top: 8rem;
`

const SubTitle = styled.div`
    ${FlexCenter}
    ${FontNanumBarunGothic('light')}
    ${tw`tw-text-center tw-text-sm tw-text-grey-700`}
    margin-top: 1.2rem;
`

const BottomFixed = styled.div`
    position: ${({isMobile}: {isMobile: boolean}) => (isMobile ? 'relative' : 'absolute')};
    bottom: 0;
    left: 0;
    right: 0;
`

const Img = styled.div`
    ${FlexCenter}
    ${tw`tw-text-center`}
    margin-top: 7.8rem;
`

const Intro = styled.div`
    background-color: rgba(246, 244, 232, 0.8);
    border-radius: 2.4rem 2.4rem 0px 0px;
    padding: 3.6rem 2.4rem 2.4rem;
`

const IntroTitle = styled.div`
    ${FontNanumBarunGothic()}
    ${tw`tw-text-lg tw-text-grey-800`}
`

const IntroContent = styled.div`
    ${FontNanumBarunGothic('normal')}
    ${tw`tw-text-sm tw-text-grey-600`}
    padding: ${({isMobile}: {isMobile: boolean}) => (isMobile ? '1.6rem 0 13.6rem' : '1.6rem 0 3.2rem')};
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
        margin-top: ${({isMobile}: {isMobile: boolean}) => (isMobile ? '0' : '1.2rem')};
    }
`

const Login = ({isMobile}: {isMobile: boolean}) => {
    return (
        <Container>
            <Title>
                나에게 보내는 편지
                <br />
                ‘코로나’편
            </Title>
            <SubTitle>
                안녕, 나야! 어려운 시기,
                <br />
                미래의 나에게 마음을 담아 전해줘.
            </SubTitle>
            <BottomFixed isMobile={isMobile}>
                <Img>
                    <SvgLogin />
                </Img>
                <Intro>
                    <IntroTitle>온전히 나에게 집중하는 시간...</IntroTitle>
                    <IntroContent isMobile={isMobile}>
                        이 서비스는 시끄러운 외부 환경에서 벗어나 스스로를 돌아보고 돌볼 수 있는 시간을 제공하는
                        플랫폼이야.
                        <br />
                        삶에 대한 깊이있는 질문에 답하기를 통해 자신의 생각을 정리하고 오직 자신에게 집중하는 순간을
                        느껴봐.
                        <br />
                        세상에 너무 많은 정보와 네트워킹이 범람하는 요즘, 많은 사람들이 인생에서 가장 중요한 것은 바로
                        자신이라는 사실을 잊어버리곤 해.
                        <br />
                        나에게 쓰는 편지는 이처럼 가장 소중한 자신을 이해하고 알아가는 과정을 제시해줘.
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
