import Header from '$components/header'
import styled from '@emotion/styled'
import SvgHome from 'assets/HomeImage'
import tw from 'twin.macro'

const Container = styled.div`
    ${tw`tw-bg-beige-300`}
    min-height: 100vh;
    height: 100%;
    padding: 0 2.4rem;
`

const TitleContainer = styled.div`
    ${tw`tw-flex tw-text-left tw-flex-1 tw-justify-start tw-items-center tw-font-ohsquare tw-font-bold tw-text-xl tw-text-primary-green-500`}
    margin-top: 3.2rem;
`

const Title = styled.span``

const Highlight = styled.span`
    ${tw`tw-text-primary-green-500`}
    background-image: linear-gradient(1turn, #DCAE5C, #DCAE5C 8px, transparent 0, transparent);
`

const SubTitle = styled.div`
    ${tw`tw-flex tw-text-left tw-flex-1 tw-justify-start tw-items-center tw-font-ohsquare-air tw-font-light tw-text-base tw-text-grey-700`}
    margin-top: 1.2rem;
`

const MainImage = styled.div`
    ${tw`tw-flex tw-text-right tw-flex-1 tw-justify-end tw-items-center`}
    margin-top: 1.2rem;
`

const Main = () => {
    return (
        <Container>
            <Header />
            <TitleContainer>
                <Title>
                    <Highlight>총 9,999통</Highlight>의 편지가
                    <br />
                    작성되었어요.
                </Title>
            </TitleContainer>
            <SubTitle>
                코로나가 끝나는 그 날,
                <br />
                마음을 담은 편지를 전달해줄게요.
            </SubTitle>
            <MainImage>
                <SvgHome />
            </MainImage>
        </Container>
    )
}
export default Main
