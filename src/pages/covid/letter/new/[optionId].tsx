import styled from '@emotion/styled'
import tw from 'twin.macro'
import NewLetterQuestion from '$components/question/question'
import {withAxios} from '$utils/fetcher/withAxios'
import {Question} from '$types/response/letter'
import cookies from 'next-cookies'
import {GetServerSideProps} from 'next'
import Answer from '$components/question/answer'
import ROUTES from '$constants/routes'
import {useLetterStore} from '$contexts/StoreContext'
import {useRouter} from 'next/router'

interface Props {
    questions: Question[]
}

const NewLetter = ({questions}: Props) => {
    const router = useRouter()
    const {answer, title} = useLetterStore()
    const onClickConfirm = () => {
        console.log('here')
        if (answer.length === 0 || title.length === 0) return
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW.ATTACH,
            query: {optionId: router.query.optionId},
        })
    }

    return (
        <>
            <Header />
            <Container>
                <NewLetterQuestion questions={questions} />
                <div>
                    <Answer />
                    <ConfirmButton onClick={onClickConfirm}>확인</ConfirmButton>
                </div>
            </Container>
        </>
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
    margin: 0 auto;
    text-align: center;
    min-height: calc(100vh - 5.6rem);
    justify-content: space-between;
`
const Header = styled.section`
    height: 5.6rem;
`
const ConfirmButton = styled.button`
    ${tw`tw-relative tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`
export default NewLetter
