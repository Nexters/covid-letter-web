import {useState} from 'react'
import {Question} from '$types/response/letter'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import Answer from './answer'

const NewLetterQuestion = ({question}: {question: Question[]}) => {
    const INITIAL_ID = 0
    const [currentQuestionId, setCurrentQuestionId] = useState<number>(INITIAL_ID)
    const onClickNext = () => {
        if (currentQuestionId === Object.keys(question).length - 1) setCurrentQuestionId(INITIAL_ID)
        else setCurrentQuestionId(currentQuestionId + 1)
    }

    return (
        <>
            <QuestionWrapper>
                <span className="question-number">질문 {currentQuestionId + 1}</span>
                <h3>{question[currentQuestionId].text}</h3>
                <span className="create-date">작성 날짜 | 2021.00.00</span>
            </QuestionWrapper>
            <Button onClick={onClickNext}>다른 질문에 대답할래요</Button>
            <Answer />
            <ConfirmButton>확인</ConfirmButton>
        </>
    )
}

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

const ConfirmButton = styled.button`
    ${tw`tw-fixed tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    min-width: 36rem;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`

export default NewLetterQuestion
