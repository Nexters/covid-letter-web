import styled from '@emotion/styled'
import {GetServerSideProps} from 'next'
import {withAxios} from '$utils/fetcher/withAxios'
import {Letter} from '$types/response/letter'
import cookies from 'next-cookies'
import Back from '$components/appbar/Back'

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

/**
 * @param dateString
 * @return string YYYY.MM.DD
 */
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate();

    return `${date.getFullYear()}.${month > 10 ? month : `0${month}`}.${day > 10 ? day : `0${day}`}`
}


const Letters = ({letters}: {letters: Letter[]}) => {

    const openLetter = (encryptedId: string) => {
        console.log(`open letter: ${encryptedId}`)
    }

    return (
        <Container>
            <Back />
            <LettersContainer>
                <Title>작성한 편지 목록</Title>
                <SubTitle>과거의 내가 작성한 편지들이에요.</SubTitle>
                <ListContainer>
                    {letters.map(({title, state, sticker, createdDate, encryptedId}) => (
                        <ItemContainer key={encryptedId} onClick={() => openLetter(encryptedId)}>
                            <div>제목: {title}</div>
                            <div>작성일: {formatDate(createdDate)}</div>
                            <div>발송기준: -</div>
                            <div>전송상태: {state} - UI 적용</div>
                            <div>스티커: {sticker} - UI 적용</div>
                        </ItemContainer>
                    ))}
                </ListContainer>
            </LettersContainer>
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
