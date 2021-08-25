import {Question} from '$types/response/letter'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import {getCurrentDate} from '$utils/date'
import {useLetterStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'

const INITIAL_ID = 1

const NewLetterQuestion = ({questions}: {questions: Question[]}) => {
    const {questionId, setQuestionId} = useLetterStore()

    const clickNextQuestion = () => {
        if (questionId !== null) {
            const isLastQuestion = questionId === Object.keys(questions).length - 1
            if (isLastQuestion) {
                setQuestionId(INITIAL_ID)
            } else {
                setQuestionId(questionId + 1)
            }
        } else setQuestionId(INITIAL_ID)
    }

    const clickFreeQuestion = () => {
        setQuestionId(null)
    }

    return (
        <QuestionContainer>
            <QuestionWrapper>
                {questionId !== null ? (
                    <>
                        <span className="question-number">질문 {questionId}</span>
                        <h3>
                            {questions[questionId].text?.split('\n').map((text) => (
                                <span key={text}>
                                    {text}
                                    <br />
                                </span>
                            ))}
                        </h3>
                    </>
                ) : (
                    <>
                        <span className="question-number">질문</span>
                        <h3>
                            미래의 나에게
                            <br />
                            자유롭게 할 말을 적어봐.
                        </h3>
                    </>
                )}

                <span className="create-date">작성 날짜 | {getCurrentDate()}</span>
            </QuestionWrapper>
            <Button onClick={clickNextQuestion}>다른 질문에 대답할래요</Button>
            <TextButton onClick={clickFreeQuestion}>오늘은 자유롭게 쓸래</TextButton>
        </QuestionContainer>
    )
}

const QuestionContainer = styled.section`
    display: inherit;
    flex-direction: inherit;
    min-width: 100%;
    justify-content: space-between;
`
const QuestionWrapper = styled.div`
    letter-spacing: -0.015rem;
    margin: 1.6rem 1.4rem 2.4rem;

    .question-number {
        ${tw`tw-font-nanumBarunGothic tw-text-grey-800`}
        font-size: 1.4rem;
        line-height: 2.2rem;
        background-image: linear-gradient(1turn, #e7bf78, #e7bf78 8px, transparent 0, transparent);
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
    margin: 0 auto;
    padding: 1rem 1.6rem;
    height: 4.2rem;
    box-sizing: border-box;
    border-radius: 0.4rem;
    color: #403f3e; //디자인 시스템에 없는 색
    font-size: 1.4rem;
`

const TextButton = styled.button`
    ${tw`tw-text-primary-green-300 tw-font-nanumBarunGothic `}
    font-size: 1.4rem;
    line-height: 2.2rem;
    letter-spacing: -0.015em;
    padding-top: 1.2rem;
    text-decoration: underline;
    text-underline-position: under;
`
export default observer(NewLetterQuestion)
