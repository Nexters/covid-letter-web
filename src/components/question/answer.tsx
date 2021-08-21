import {useLetterStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import AutoTextArea from '$components/textarea'

export const MAX_LETTER_ANSWER_LENGTH = 1000
export const MAX_LETTER_TITLE_LENGTH = 12

const Answer = () => {
    const {answer, title, addAnswer, addTitle, resetAnswer} = useLetterStore()

    return (
        <AnswerWrapper>
            <TitleInputWrapper>
                <input
                    className="title"
                    placeholder="제목은 여기에 적어!"
                    value={title}
                    maxLength={12}
                    onChange={(e) => addTitle(e.target.value)}
                />
                <span className="title-length">
                    {title.length}/{MAX_LETTER_TITLE_LENGTH}
                </span>
            </TitleInputWrapper>
            <hr className="divider" />
            <AnswerInputWrapper>
                <AutoTextArea className="answer" value={answer} onChange={(e) => addAnswer(e.target.value)} />
                <div className="sub-items">
                    <span className="answer-length">
                        {answer.length}/{MAX_LETTER_ANSWER_LENGTH}
                    </span>
                    <button className="reset-button" onClick={resetAnswer}>
                        전부 지우기
                    </button>
                </div>
            </AnswerInputWrapper>
        </AnswerWrapper>
    )
}

const AnswerWrapper = styled.section`
    ${tw`tw-bg-beige-200 
        tw-flex tw-flex-col`}
    bottom: 5.2rem;
    padding: 3.2rem 2.4rem 1.6rem;
    margin-top: 5.5rem;
    letter-spacing: -0.015em;
    border-radius: 1rem;
    .divider {
        ${tw`tw-border-t-2 tw-border-beige-400 tw-border-dashed`}
        margin-top: 0.8rem;
        margin-bottom: 2.4rem;
    }
`

const TitleInputWrapper = styled.div`
    ${tw`tw-bg-beige-200 tw-font-ohsquare-air tw-text-grey-800`}
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 19.5rem;
    font-size: 1.8rem;
    height: 4.2rem;
    .title {
        ${tw`tw-bg-beige-200`}
        line-height: 2.5rem;
    }
    .title-length {
        ${tw`tw-text-grey-500`}
        font-size: 1.2rem;
        line-height: 1.4rem;
    }
`

const AnswerInputWrapper = styled.div`
    ${tw`tw-bg-beige-200 tw-font-nanumBarunGothic tw-text-grey-800`}
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    font-size: 1.4rem;
    line-height: 2.2rem;
    min-height: 100%;
    .answer {
        ${tw`tw-bg-beige-200`}
        width: 100%;
    }
    .sub-items {
        display: inherit;
        justify-content: space-between;
        font-size: 1.4rem;
        line-height: 2.2rem;
        margin-top: 2.4rem;
        .answer-length {
            ${tw`tw-text-grey-500`}
        }
        .reset-button {
            ${tw`tw-text-grey-700`}
        }
    }
`

export default observer(Answer)
