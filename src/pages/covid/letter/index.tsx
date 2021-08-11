import styled from '@emotion/styled'
import {GetServerSideProps} from 'next'
import {withAxios} from '$utils/fetcher/withAxios'
import {Letter} from '$types/response/letter'
import cookies from 'next-cookies'
import Back from '$components/appbar/Back'
import HalfLayer from '$components/layer/HalfLayer'
import {useState} from 'react'
import {formatDate} from '$utils/date'

const Container = styled.div`
    background-color: #f2f2f2;
    min-height: 100vh;
    height: 100%;
`

const LettersContainer = styled.div`
    padding-top: 5.6rem;
`

const Title = styled.div``
const SubTitle = styled.div``
const ListContainer = styled.ul``
const ItemContainer = styled.li`
    margin: 1rem;
    padding 1rem;
    border: solid;
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

    return (
        <Container>
            <Back />
            <LettersContainer>
                <Title>작성한 편지 목록</Title>
                <SubTitle>과거의 내가 작성한 편지들이에요.</SubTitle>
                <ListContainer>
                    {letters.map(({title, state, sticker, createdDate, encryptedId}) => (
                        <ItemContainer key={encryptedId} onClick={() => openEnvelope(encryptedId)}>
                            <div>제목: {title}</div>
                            <div>작성일: {formatDate(createdDate)}</div>
                            <div>발송기준: -</div>
                            <div>전송상태: {state} - UI 적용</div>
                            <div>스티커: {sticker} - UI 적용</div>
                        </ItemContainer>
                    ))}
                </ListContainer>
            </LettersContainer>
            <HalfLayer isShow={isShowEnvelope} closeFn={closeEnvelope} >
                {openedLetterId}
            </HalfLayer>
        </Container>
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
