import {useState} from 'react'
import {Question} from '$types/response/letter'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import Answer from './answer'
import {getCurrentDate} from '$utils/date'

const NewLetterQuestion = ({questions}: {questions: Question[]}) => {
    const INITIAL_ID = 0
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(INITIAL_ID)
    const onClickNext = () => {
        if (currentQuestionIdx === Object.keys(questions).length - 1) setCurrentQuestionIdx(INITIAL_ID)
        else setCurrentQuestionIdx(currentQuestionIdx + 1)
    }

    return (
        <>
            <QuestionWrapper>
                <span className="question-number">질문 {currentQuestionIdx + 1}</span>
                <h3>{questions[currentQuestionIdx].text}</h3>
                <span className="create-date">작성 날짜 | {getCurrentDate()}</span>
            </QuestionWrapper>
            <Button onClick={onClickNext}>다른 질문에 대답할래요</Button>
            <Answer />
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

export default NewLetterQuestion
