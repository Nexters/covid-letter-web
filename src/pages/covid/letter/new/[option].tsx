import {Question} from '$types/response/letter'
import {withAxios} from '$utils/fetcher/withAxios'
import {useState} from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

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
const QuestionWrapper = styled.div`
    letter-spacing: -0.015rem;
    margin: 1.6rem 1.4rem 2.4rem;

    .question-number {
        ${tw`tw-font-nanumBarunGothic tw-text-grey-800`}
        font-size: 1.4rem;
        line-height: 2.2rem;
    }

    h3 {
        ${tw`tw-font-ohsquare-air tw-text-primary-green-500`}
        margin-top: 1.7rem;
        margin-bottom: 1.2rem;
        font-size: 2rem;
        line-height: 3.2rem;
    }

    .create-date {
        ${tw`tw-font-nanumBarunGothic tw-text-grey-600`}
        font-size: 1.4rem;
        line-height: 2.2rem;
    }
`

const Button = styled.button`
    ${tw`tw-border tw-border-grey-600
        tw-font-ohsquare-air
    `}
    min-width: 16.2rem;
    padding: 1rem 1.6rem;
    height: 4.2rem;
    box-sizing: border-box;
    border-radius: 0.4rem;
    color: #403f3e; //디자인 시스템에 없는 색
    font-size: 1.4rem;
`

interface Props {
    question: Question[]
}
const INITIAL_ID = 0

const LetterNew = ({question}: Props) => {
    const [currentQuestionId, setCurrentQuestionId] = useState<number>(INITIAL_ID)
    const onClickNext = () => {
        if (currentQuestionId === question.length - 1) setCurrentQuestionId(INITIAL_ID)
        else setCurrentQuestionId(currentQuestionId + 1)
    }
    return (
        <Container>
            <Header />
            <QuestionWrapper>
                <span className="question-number">질문 {question[currentQuestionId].id + 1}</span>
                <h3>{question[currentQuestionId].text}</h3>
                <span className="create-date">작성 날짜 | 2021.00.00</span>
            </QuestionWrapper>
            <Button onClick={onClickNext}>다른 질문에 대답할래요</Button>
        </Container>
    )
}

export async function getServerSideProps(context: {query: {optionId: number}}) {
    const {optionId} = context.query
    const res = await withAxios<Question[]>({
        url: `/letters/options/${optionId}/questions`,
        method: 'GET',
    })
    const question = res

    return {props: {question}}
}
export default LetterNew
