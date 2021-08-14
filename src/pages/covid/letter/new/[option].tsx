import styled from '@emotion/styled'
import tw from 'twin.macro'
import NewLetterQuestion from './question'
import {withAxios} from '$utils/fetcher/withAxios'
import {Question} from '$types/response/letter'

interface Props {
    question: Question[]
}

const NewLetter = ({question}: Props) => {
    return (
        <Container>
            <Header />
            <NewLetterQuestion question={question} />
        </Container>
    )
}

export async function getServerSideProps(context: {query: {optionId: number}}) {
    const {optionId} = context.query
    const res = await withAxios<Question[]>({
        url: `/letters/options/1`,
        method: 'GET',
    })
    const question = res

    return {props: {question}}
}

const Container = styled.section`
    ${tw`tw-bg-beige-300 tw-flex tw-flex-col`}
    max-width: 36rem;
    height: 100vh;
    margin: 0 auto;
    text-align: center;
    align-items: center;
`
const Header = styled.section`
    height: 5.6rem;
`

export default NewLetter
