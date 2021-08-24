import {PropsFromApp} from '$types/index'
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import MainLayout from '$components/layout/MainLayout'
import cookies from 'next-cookies'
import {withAxios} from '$utils/fetcher/withAxios'
import {Letter} from '$types/response/letter'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import {FontOhsquare} from '$styles/utils/font'
import {FlexBetween, FlexStart} from '$styles/utils/layout'
import Divider from '$components/letter/Divider'
import {StickerWithLetterFactory} from '$components/sticker/stickerWithLetterFactory'
import {convertCommonDateFormat} from '$utils/date'

const Unposted = ({
    isGoogleLogin,
    isMobile,
    letters,
}: PropsFromApp<InferGetServerSidePropsType<typeof getServerSideProps>>) => {

    const goSelectSendOption = ({encryptedId}: {encryptedId: string}) => {
        //todo 선택 시 발송옵션 선택화면으로 이동처리
        console.info(encryptedId)
    }

    return (
        <MainLayout isMobile={isMobile} isGoogleLogin={isGoogleLogin}>
            <Container>
                <TitleContainer>부치지 못한 편지<span className="icon-letter">📦️</span></TitleContainer>
                <SubTitle>발송 기준을 정하고 편지를 받아봐!</SubTitle>
                <LettersContainer>
                    {letters.map(({title, sticker, createdDate, encryptedId}: Letter, index: number) => (
                        <LetterItemContainer key={encryptedId}>
                            <LetterItem>
                                <div className="sticker-title-wrapper">
                                    {StickerWithLetterFactory(sticker)}
                                    <LetterItemTitleWrapper>
                                        <div className="title">{title}</div>
                                        <div className="date">작성일: {convertCommonDateFormat(createdDate)}</div>
                                    </LetterItemTitleWrapper>
                                </div>
                                <SelectSendOptionButton onClick={() => goSelectSendOption({encryptedId})}>기준 선택</SelectSendOptionButton>
                            </LetterItem>
                            {index !== letters.length - 1 && <Divider/>}
                        </LetterItemContainer>
                    ))}
                </LettersContainer>
            </Container>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {letterLogin: token} = cookies(context)
    const letters = await withAxios<Letter[]>({
        url: '/letters',
        headers: {Authorization: token},
        method: 'GET',
        params: {unposted: true},
    })

    return {
        props: {
            letters,
        },
    }
}

const Container = styled.div`
    ${tw`tw-h-screen`}
    padding: 8.8rem 2.4rem 3.2rem;
`

const TitleContainer = styled.div`
    ${FontOhsquare}
    ${FlexStart}
    ${tw`tw-text-left tw-text-xl tw-text-primary-green-500`}
    line-height: 2.4rem;
    
    .icon-letter {
        margin-top: 0.2rem;
        margin-left: 0.8rem;
    }
`
const SubTitle = styled.div`
    ${FlexStart}
    ${tw`tw-text-left tw-text-base tw-text-primary-green-500`}
    margin-top: 0.8rem;
`

const LettersContainer = styled.div`
    margin-top: 4.4rem;
`

const LetterItemContainer = styled.div`
    margin: 2.1rem 0;
`

const LetterItem = styled.div`
    ${FlexBetween}
    margin-bottom: 1.6rem;
    
    .sticker-title-wrapper {
        ${FlexStart}    
    }
`

const LetterItemTitleWrapper = styled.div`
    margin-left: 1.2rem;

    .title {
        ${tw`tw-text-sm tw-text-grey-800`}
        letter-spacing: -0.015em;
    }
    
    .date {
        ${tw`tw-text-xs tw-font-light tw-text-grey-700`}
        letter-spacing: -0.015em;
    }
`

const SelectSendOptionButton = styled.button`
    ${tw`tw-font-bold tw-text-2xs tw-text-center tw-text-grey-000 tw-bg-primary-green-500`}
    letter-spacing: -0.015em;
    padding: 0.8rem 1.2rem;
    border-radius: 0.4rem;
`

export default Unposted
