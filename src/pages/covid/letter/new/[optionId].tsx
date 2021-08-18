import styled from '@emotion/styled'
import tw from 'twin.macro'
import NewLetterQuestion from '$components/question/question'
import {withAxios} from '$utils/fetcher/withAxios'
import {Question} from '$types/response/letter'
import cookies from 'next-cookies'
import {GetServerSideProps} from 'next'

interface Props {
    questions: Question[]
}

const NewLetter = ({questions}: Props) => {
    return (
        <Container>
            <Header />
            <NewLetterQuestion questions={questions} />
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {letterLogin} = cookies(context)
    const optionId = context.query.optionId
    const res = await withAxios<Question[]>({
        url: `/letters/options/${optionId}`,
        method: 'GET',
        headers: {
            Authorization: letterLogin,
        },
    })
    const questions = res

    return {props: {questions}}
}

const Container = styled.section`
    ${tw`tw-bg-beige-300 tw-flex tw-flex-col`}
    //max-width: 36rem;
    height: calc(100vh - 5.2rem);
    margin: 0 auto;
    text-align: center;
    align-items: center;
`
const Header = styled.section`
    height: 5.6rem;
`

export default NewLetter
