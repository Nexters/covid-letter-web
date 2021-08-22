import styled from '@emotion/styled'
import {GetServerSideProps} from 'next'
import {withAxios} from '$utils/fetcher/withAxios'
import {Letter} from '$types/response/letter'
import cookies from 'next-cookies'
import Back from '$components/appbar/Back'
import HalfLayer from '$components/layer/HalfLayer'
import {useState} from 'react'
import {convertCommonDateFormat} from '$utils/date'
import tw from 'twin.macro'
import {FontNanumBarunGothic, FontOhsquare, FontOhsquareAir} from '$styles/utils/font'
import {FlexBetween, FlexStart} from '$styles/utils/layout'
import EmptyLetterListContainer from '$components/letter/EmptyLetterListContainer'
import Divider from '$components/letter/Divider'
import {StickerWithLetterFactory} from '$components/sticker/stickerWithLetterFactory'
import {LetterStateTagFactory} from '$components/letter/LetterStateTagFactory'
import Envelope from '$components/letter/Envelope'

const Letters = ({letters}: {letters: Letter[]}) => {

    const [isShowEnvelope, setIsShowEnvelop] = useState<boolean>(false)
    const [openedLetter, setOpenedLetter] = useState<Letter | null>(null)

    const openEnvelope = (encryptedId: string) => {
        setOpenedLetter(letters.filter(letter => letter.encryptedId === encryptedId)[0])
        setIsShowEnvelop(true)
    }
    const closeEnvelope = () => {
        setOpenedLetter(null)
        setIsShowEnvelop(false)
    }

    const letterList = letters.length === 0
        ? <EmptyLetterListContainer />
        : <ListContainer>
                {letters.map(({title, state, sticker, createdDate, encryptedId, sendOptionText}, index) => (
                    <div key={encryptedId}>
                        <ItemContainer className="letter_item" onClick={() => openEnvelope(encryptedId)}>
                            <ItemTitleWrapper>
                                <span className='text'>{title}</span>
                                {LetterStateTagFactory(state)}
                            </ItemTitleWrapper>
                            <ItemDescWrapper>
                                <div className='text-wrap'>
                                    작성일: {convertCommonDateFormat(createdDate)}
                                    <br/>
                                    발송기준: {sendOptionText}
                                </div>
                                {StickerWithLetterFactory(sticker)}
                            </ItemDescWrapper>
                        </ItemContainer>
                        {index !== letters.length - 1 && <Divider/>}
                    </div>
                ))}
          </ListContainer>

    return (
        <>
            <Back />
            <Container>
                <LettersContainer>
                    <TitleContainer>작성한 편지 목록 <span className="icon-letter">✉️</span></TitleContainer>
                    <SubTitle>과거의 내가 작성한 편지들이에요.</SubTitle>
                    {letterList}
                </LettersContainer>

                <HalfLayer isShow={isShowEnvelope} closeFn={closeEnvelope} >
                    {openedLetter && (<Envelope letter={openedLetter} />)}
                </HalfLayer>
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {letterLogin: token} = cookies(context)
    const letters = await withAxios<Letter[]>({
        url: '/letters',
        headers: {Authorization: token},
        method: 'GET',
        params: {unposted: false},
    })

    return {
        props: {
            letters,
        },
    }
}

const Container = styled.div`
    ${tw`tw-bg-beige-300 tw-h-screen`}
    min-height: 100vh;
    padding: 3.2rem 2.4rem;
`
const LettersContainer = styled.div`
    padding-top: 5.6rem;
`
const TitleContainer = styled.div`
    ${FontOhsquare}
    ${FlexStart}
    ${tw`tw-text-left tw-text-xl tw-text-primary-green-500`}
    
    .icon-letter {
        margin-top: 0.2rem;
        margin-left: 0.8rem;
    }
`
const SubTitle = styled.div`
    ${FontOhsquareAir}
    ${FlexStart}
    ${tw`tw-text-left tw-text-base tw-text-primary-green-500`}
    margin-top: 0.8rem;
`

const ListContainer = styled.div`
    margin-top: 3.2rem;
`
const ItemContainer = styled.div`
    cursor: pointer;    
    padding-bottom: 1.6rem;
`

const ItemTitleWrapper = styled.div`
    ${FlexStart}
    .text {
        ${tw`tw-text-sm tw-font-light tw-text-grey-800`}
        letter-spacing: -0.015em;
    }
`

const ItemDescWrapper = styled.div`
    ${FlexBetween}
    margin-top: 0.8rem;
    .text-wrap {
        ${tw`tw-text-xs tw-text-grey-700`}
        ${FontNanumBarunGothic('light')}
        letter-spacing: -0.015em;
    }
`

export default Letters
