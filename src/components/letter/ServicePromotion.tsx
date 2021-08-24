import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'
import styled from '@emotion/styled'
import {MainButton, MainLineButton} from '$styles/utils/components'
import tw from 'twin.macro'
import IconEnvelope from '$assets/icons/IconEvelope'
import {FlexCenter} from '$styles/utils/layout'

const ServicePromotion = () => {
    const router = useRouter()

    return (
        <Container>
            <EnvelopIconWrapper>
                <IconEnvelope />
            </EnvelopIconWrapper>
            <DescriptionWrapper>
                <div className="first-message">
                    <span>
                        과거에서부터 나에게 온
                        <br />
                        편지가 어땠어?
                        <br />
                        오늘 받아본 편지를 읽고
                        <br />
                        위로가 되었다면,
                    </span>
                </div>
                <div className="second-message">
                    <span>
                        미래의 나에게 편지 써보지 않을래?
                    </span>
                </div>
            </DescriptionWrapper>
            <LoginButton onClick={() => router.push(ROUTES.LOGIN)}>로그인하고 편지쓸래!</LoginButton>
            <ServicePromotionButton onClick={() => router.push(ROUTES.COVID.SIDE.ABOUT)}>서비스 먼저 구경할래</ServicePromotionButton>
        </Container>
    )
}

const Container = styled.section`
    padding-top: 1.6rem;
    padding-bottom: 1.2rem;
`

const EnvelopIconWrapper = styled.div`
    ${FlexCenter}
`

const DescriptionWrapper = styled.div`
    ${tw`tw-text-base`}
    margin-top: 1.6rem;
    
    .first-message {
        ${tw`tw-text-grey-700 tw-font-light`}
        line-height: 2.4rem;
        letter-spacing: -0.015em;
    }
    
    .second-message {
        ${tw`tw-font-bold tw-text-grey-800`}
        margin-top: 1.6rem;
        line-height: 2.2rem;
        letter-spacing: -0.015em;
    }
`

const LoginButton = styled(MainButton)`
    ${tw`tw-w-full`}
    margin-top: 2.7rem;
    padding: 1.5rem 0;
    border-radius: 0.4rem;
`

const ServicePromotionButton = styled(MainLineButton)`
    ${tw`tw-w-full`}
    margin-top: 1.6rem;
    padding: 1.5rem 0;
    border-radius: 0.4rem;
`

export default ServicePromotion
