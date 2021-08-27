import {useAlertStore, useLetterStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import AutoTextArea from '$components/textarea'
import IconEraser from '$assets/icons/IconEraser'
import useWindowResize from '$hooks/useWindowResize'
import {isMobileOnly} from 'react-device-detect'
import {useRef} from 'react'
import {FontNanumBarunGothic} from '$styles/utils/font'

export const MAX_LETTER_ANSWER_LENGTH = 1000
export const MAX_LETTER_TITLE_LENGTH = 12

const Answer = () => {
    const {answer, title, addTitle, resetAnswer, questionId} = useLetterStore()
    const {confirm} = useAlertStore()
    const handleReset = () => {
        confirm({
            title: '편지 내용을 저장하지 않았어!',
            message: '편지 내용을 저장하지 않고\n 모두 지울거야?',
            onSuccess: () => {
                resetAnswer()
            },
            successText: '응, 지울래!',
            cancelText: '아니!',
        })
        return
    }

    const [, maxHeight] = useWindowResize()
    const answerRef = useRef<HTMLTextAreaElement>(null)

    const nextFocus = () => {
        answerRef.current?.focus()
    }

    return (
        <AnswerWrapper
            style={{
                maxHeight: isMobileOnly ? `${maxHeight}px` : '',
            }}>
            <TitleInputWrapper>
                <input
                    className="title"
                    placeholder="제목은 여기에 적어!"
                    value={title}
                    maxLength={12}
                    tabIndex={0}
                    onChange={(e) => addTitle(e.target.value)}
                    onKeyPress={(e) => (e.key === 'Enter' ? nextFocus() : null)}
                />
                <span className="title-length">
                    {title.length}/{MAX_LETTER_TITLE_LENGTH}
                </span>
            </TitleInputWrapper>
            <hr className="divider" />
            <AnswerInputWrapper>
                <AutoTextArea
                    maxHeight={maxHeight}
                    ref={answerRef}
                    placeholder={
                        questionId !== null
                            ? '질문에 편하게 대답하면 돼.\n그 외에 하고 싶은 말도 자유롭게 적어줘.'
                            : '오늘의 기분, 미래의 나에게 전하고 싶은 메시지 등\n하고 싶은 말을 자유롭게 적어주면 돼.'
                    }
                />
                <div className="sub-items">
                    <span className="answer-length">
                        {answer.length}/{MAX_LETTER_ANSWER_LENGTH}
                    </span>
                    <button className="reset-button" onClick={handleReset}>
                        <IconEraser />
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
    letter-spacing: -0.015em;
    border-radius: 1rem;
    min-height: 40vh;
    .divider {
        ${tw`tw-border-t-2 tw-border-beige-400 tw-border-dashed`}
        margin-top: 0.8rem;
        margin-bottom: 2.4rem;
    }
`

const TitleInputWrapper = styled.div`
    ${tw`tw-bg-beige-200 tw-text-lg tw-text-grey-800`}
    ${FontNanumBarunGothic('normal')}
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
