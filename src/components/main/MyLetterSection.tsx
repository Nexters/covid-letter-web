import {FontNanumBarunGothic, FontOhsquare} from '$styles/utils/font'
import {FlexCenter} from '$styles/utils/layout'
import styled from '@emotion/styled'
import ImageMailBox from 'assets/ImageMailBox'
import tw from 'twin.macro'

const Container = styled.div`
    margin-top: 6.5rem;
`

const ImageContainer = styled.div`
    ${FlexCenter}
    ${tw`tw-text-center`}
`

const Title = styled.div`
    ${FlexCenter}
    ${FontNanumBarunGothic()}
    ${tw`tw-text-center tw-text-lg tw-text-grey-800`}
    margin: 2.4rem 0;
`

const LetterButton = styled.button`
    ${FontNanumBarunGothic('semibold')}
    ${tw`tw-w-full tw-text-base tw-text-primary-green-500 hover:tw-text-primary-green-500 hover:tw-bg-grey-100 focus:tw-bg-grey-100`}
    padding: 1.35rem 0;
    background-color: transparent;
    border: 2px solid var(--primary-green-500);
    border-radius: 0.4rem;

    &:hover,
    &:active {
        border: 2px solid var(--primary-green-500);
    }
`

const Highlight = styled.span`
    ${FontOhsquare}
`

const MyLetterSection = ({logined}: {logined: boolean}) => {
    if (!logined) {
        return null
    }
    return (
        <Container>
            <ImageContainer>
                <ImageMailBox />
            </ImageContainer>
            <Title>
                <span>
                    지금까지 나에게
                    <br />
                    <Highlight>00 통의 편지</Highlight>를 작성했어!
                </span>
            </Title>
            <LetterButton>편지 목록 보기</LetterButton>
        </Container>
    )
}

export default MyLetterSection
