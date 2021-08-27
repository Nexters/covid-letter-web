import CommonHeader from '$components/header/CommonHeader'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'
import ROUTES from '$constants/routes'
import {FontNanumBarunGothic, FontOhsquareAir} from '$styles/utils/font'
import {FlexCenter} from '$styles/utils/layout'
import styled from '@emotion/styled'
import IconCheck from 'assets/icons/IconCheck'
import IntroImage from 'assets/images/IntroImage'
import {useRouter} from 'next/router'
import {ReactNode} from 'react'
import tw from 'twin.macro'

const TitleSection = styled.div`
    ${FlexCenter}
    ${FontOhsquareAir}
    ${tw`tw-text-2xl tw-text-center tw-text-primary-green-500`}
    margin-top: 3.6rem;
`

const ImageSection = styled.div`
    ${FlexCenter}
    ${tw`tw-text-center`}
    margin: 4rem auto 4.4rem;
`

const IntroSection = styled.div`
    ${tw`tw-bg-beige-200`}
    border-radius: 2.4rem 2.4rem 0px 0px;
    padding: 4rem 2.4rem 3.2rem;

    & > div + div {
        margin-top: 4rem;
    }
`

const IntroTitle = styled.div`
    ${FontNanumBarunGothic()}
    ${tw`tw-text-lg tw-text-grey-800`}
`
const IntroContent = styled.div`
    ${FontNanumBarunGothic('light')}
    ${tw`tw-text-sm tw-text-grey-700`}
    margin-top: 1.6rem;
`

const Highlight = styled.span`
    margin-left: 1.2rem;
    background-image: linear-gradient(1turn, #ded9c6, #ded9c6 8px, transparent 0, transparent);
`

type List = {
    title: string | ReactNode
    content: ReactNode
}

const list: List[] = [
    {
        title: '오늘의 내가, 미래의 나에게',
        content: (
            <>
                안녕, 나야. 코로나19로 인해 우리는 그동안 살아왔던 환경과는 너무나 다른 세상에 살고 있어.
                <br />
                우리는 코로나 이전의 삶을 그리워하고, 코로나 종식 이후의 삶을 상상하며 {`'`}꼭 00 해야지{`'`} 하고
                결심도 하곤 하지.
                <br />
                <br />
                하지만 안타깝게도 사람은 망각의 동물이야.
                <br />
                어쩌면 머지 않은 시간에 이 힘듦을 잊어버릴지도 몰라.
                <br />
                <br />
                그래서 지금의 답답한 마음과 희망을 담아 미래의 나에게 편지를 쓰는게 어떨까 싶어.
                <br />
                <br />
                마스크 없는 삶을 생각해보며 지금의 우울한 기분을 잠시 잊어 보기도 하고, 훗날 편지를 받았을 때 {`'`}그때
                그랬지...{`'`} 생각하며 코로나 이후 삶에 감사한 마음을 가지며 이전에 계획했던 내용을 되돌아볼 수도
                있도록 말야.
            </>
        ),
    },
    {
        title: (
            <>
                <IconCheck />
                <Highlight>나에게 편지 쓰기</Highlight>
            </>
        ),
        content: (
            <>
                지금의 내가 미래의 나에게 보내는 편지야.
                <br />
                발송 받을 기간을 직접 정하고 편한 마음으로 적어봐.
            </>
        ),
    },
    {
        title: (
            <>
                <IconCheck />
                <Highlight>작성한 내 편지 목록</Highlight>
            </>
        ),
        content: (
            <>
                과거의 내가 나에게 보낸 편지를 모아둔 공간이야.
                <br />
                발송된 편지는 읽어볼 수 있지만, 아직 발송되지 않은 편지를 보기위해서는 조금 더 기다려야 해.
                <br />
                네가 설정한 기간에 안전하게 배달될 수 있도록 내가 소중히 보관하고 있을게:)
            </>
        ),
    },
    {
        title: (
            <>
                <IconCheck />
                <Highlight>부치지 못한 편지</Highlight>
            </>
        ),
        content: (
            <>
                발송 기준을 정하지 못한 편지가 모여 있는 공간이야.
                <br />
                내용이 궁금하지 않아?
                <br />
                발송 기준을 선택하고 미래에 편지를 받아봐!
            </>
        ),
    },
]

const About = () => {
    const router = useRouter()

    const goMain = () => {
        router.push(ROUTES.COVID.MAIN)
    }
    return (
        <>
            <CommonHeader type={HEADER_TYPE.CLOSE} position={HEADER_POSITION.RIGHT} onClick={goMain} />
            <TitleSection>
                “
                <br />
                안녕, 나야.
                <br />
                코로나가 끝난다면...
            </TitleSection>
            <ImageSection>
                <IntroImage />
            </ImageSection>
            <IntroSection>
                {list.map(({title, content}: List, index: number) => (
                    <div key={index}>
                        <IntroTitle>{title}</IntroTitle>
                        <IntroContent>{content}</IntroContent>
                    </div>
                ))}
            </IntroSection>
        </>
    )
}

export default About
