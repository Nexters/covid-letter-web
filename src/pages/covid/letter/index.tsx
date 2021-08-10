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

const Letters = ({letters}: {letters: Letter[]}) => {

    return (
        <Container>
            <Back />
            <LettersContainer>
                {letters.map(({title}) => (
                    <div key={title}>{title}</div>
                ))}
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
