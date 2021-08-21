import {useLetterStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'

export const MAX_LETTER_ANSWER_LENGTH = 1000
export const MAX_LETTER_TITLE_LENGTH = 12

const Answer = () => {
    const router = useRouter()

    const {answer, title, addAnswer, addTitle, resetAnswer} = useLetterStore()
    const onClickConfirm = () => {
        if (answer.length === 0 || title.length === 0) return
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW.ATTACH,
            query: {optionId: router.query.optionId},
        })
    }
    return (
        <>
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
                    <textarea
                        className="answer"
                        value={answer}
                        maxLength={1000}
                        placeholder="질문에 대하여 편하게 대답해주시고, 그 외에 하고싶은 말을 자유롭게 적어주세요."
                        onChange={(e) => addAnswer(e.target.value)}
                    />
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
            <ConfirmButton onClick={onClickConfirm}>확인</ConfirmButton>
        </>
    )
}

const AnswerWrapper = styled.section`
    ${tw`tw-bg-beige-200 
        tw-flex tw-flex-col`}
    width: 100%;
    max-width: 42rem;
    height: calc(100vh - 43rem);
    min-height: 40%;
    position: fixed;
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
    height: 4.2rem;
    font-size: 1.8rem;
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
    height: 100%;
    font-size: 1.4rem;
    line-height: 2.2rem;
    .answer {
        ${tw`tw-bg-beige-200`}
        width: 100%;
        height: calc(100% - 2.2rem);
    }
    .sub-items {
        display: flex;
        justify-content: space-between;
        font-size: 1.4rem;
        line-height: 2.2rem;
        .answer-length {
            ${tw`tw-text-grey-500`}
        }
        .reset-button {
            ${tw`tw-text-grey-700`}
        }
    }
`

const ConfirmButton = styled.button`
    ${tw`tw-fixed tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`

export default observer(Answer)
