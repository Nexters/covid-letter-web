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
import {FlexBetween, FlexCenter, FlexStart} from '$styles/utils/layout'
import EmptyLetterListContainer from '$components/letter/EmptyLetterListContainer'
import Divider from '$components/letter/Divider'
import {StickerWithLetterFactory} from '$components/sticker/stickerWithLetterFactory'

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
    
`

const ItemTitleWrapper = styled.div`
    .text {
        ${tw`tw-text-sm tw-font-light tw-text-grey-800`}
        letter-spacing: -0.015em;
    }
`

const ItemDescWrapper = styled.div`
    ${FlexBetween}
    margin-top: 0.8rem;
    .text-wrap {
        ${tw`tw-text-xs`}
        ${FontNanumBarunGothic('light')}
        letter-spacing: -0.015em;
        color: #5B5A57;
    }
`

const Letters = ({letters}: {letters: Letter[]}) => {

    const [isShowEnvelope, setIsShowEnvelop] = useState(false)
    const [openedLetterId, setOpenedLetterId] = useState('')

    const openEnvelope = (encryptedId: string) => {
        setOpenedLetterId(encryptedId)
        setIsShowEnvelop(true)
    }
    const closeEnvelope = () => {
        setOpenedLetterId('')
        setIsShowEnvelop(false)
    }

    const letterList = letters.length > 0
        ? (
            <ListContainer>
                {letters.map(({title, state, sticker, createdDate, encryptedId}, index) => (
                    <>
                        {/*<ItemContainer key={encryptedId} className="letter_item" onClick={() => openEnvelope(encryptedId)}>*/}
                        <ItemContainer key={encryptedId} className="letter_item" onClick={() => {}}>
                            <ItemTitleWrapper>
                                <span className='text'>{title}</span>
                                  - 발송상태 {state}
                            </ItemTitleWrapper>
                            <ItemDescWrapper>
                                <div className='text-wrap'>
                                    작성일: {convertCommonDateFormat(createdDate)}
                                    <br/>
                                    발송기준:
                                </div>
                                <div>
                                    {StickerWithLetterFactory(sticker)}
                                </div>
                            </ItemDescWrapper>
                        </ItemContainer>
                        {index !== letters.length - 1 && <Divider/>}
                    </>
                ))}
            </ListContainer>
        )
        : <EmptyLetterListContainer />

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
                    {openedLetterId}
                </HalfLayer>
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {letterLogin} = cookies(context)
    const letters = await withAxios<Letter[]>({
        url: '/letters',
        method: 'GET',
        data: {
            letterLogin,
        },
    })

    return {
        props: {
            letters,
        },
    }
}

export default Letters
