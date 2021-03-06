import NaverLoginButton from '$components/login/NaverLoginButton'
import GoogleLoginButton from '$components/login/GoogleLoginButton'
import ROUTES from '$constants/routes'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import LoginImage from 'assets/images/LoginImage'
import {FlexCenter} from '$styles/utils/layout'
import {FontNanumBarunGothic, FontOhsquareAir} from '$styles/utils/font'
import CommonHeader from '$components/header/CommonHeader'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'
import {useRouter} from 'next/router'

const Container = styled.div``

const Title = styled.div`
    ${FlexCenter}
    ${FontOhsquareAir}
    ${tw`tw-text-center tw-text-xl tw-text-primary-green-500`}
    padding-top: 3.2rem;
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
    ${tw`tw-bg-beige-200`}
    border-radius: 2.4rem 2.4rem 0px 0px;
    padding: 4.2rem 2.4rem 3.2rem;
`

const IntroTitle = styled.div`
    ${FontNanumBarunGothic()}
    ${tw`tw-text-lg tw-text-grey-800`}
`

const IntroContent = styled.div`
    ${FontNanumBarunGothic('normal')}
    ${tw`tw-text-sm tw-text-grey-600`}
    padding: ${({isMobile}: {isMobile: boolean}) => (isMobile ? '1.6rem 0 12.6rem' : '1.6rem 0 3.2rem')};
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
    const router = useRouter()
    const goMain = () => {
        router.replace(ROUTES.COVID.MAIN)
    }
    return (
        <Container>
            <CommonHeader type={HEADER_TYPE.CLOSE} position={HEADER_POSITION.RIGHT} onClick={goMain} />
            <Title>
                ????????? ????????? ??????
                <br />
                ??????????????????
            </Title>
            <SubTitle>
                ??????, ??????! ????????? ??????,
                <br />
                ????????? ????????? ????????? ?????? ?????????.
            </SubTitle>
            <BottomFixed isMobile={isMobile}>
                <Img>
                    <LoginImage />
                </Img>
                <Intro>
                    <IntroTitle>????????? ????????? ???????????? ??????...</IntroTitle>
                    <IntroContent isMobile={isMobile}>
                        ??? ???????????? ???????????? ?????? ???????????? ????????? ???????????? ???????????? ?????? ??? ?????? ????????? ????????????
                        ???????????????.
                        <br />
                        ?????? ?????? ???????????? ????????? ???????????? ?????? ????????? ????????? ???????????? ?????? ???????????? ???????????? ?????????
                        ?????????.
                        <br />
                        ????????? ?????? ?????? ????????? ??????????????? ???????????? ??????, ?????? ???????????? ???????????? ?????? ????????? ?????? ??????
                        ??????????????? ????????? ??????????????? ???.
                        <br />
                        ????????? ?????? ????????? ????????? ?????? ????????? ????????? ???????????? ???????????? ????????? ????????????.
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
