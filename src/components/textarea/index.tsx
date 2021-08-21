import React, {TextareaHTMLAttributes} from 'react'
import styled from '@emotion/styled'
import {useLetterStore} from '$contexts/StoreContext'
import TextareaAutosize from 'react-textarea-autosize'
import tw from 'twin.macro'

const AutoTextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const {answer, addAnswer} = useLetterStore()

    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        addAnswer(event.target.value)
    }

    return (
        <TextAreaWrapper>
            <TextareaAutosize
                value={answer}
                maxLength={1000}
                placeholder="질문에 대하여 편하게 대답해주시고, 그 외에 하고싶은 말을 자유롭게 적어주세요."
                onChange={onChangeHandler}
                autoFocus
                className="textarea"
            />
        </TextAreaWrapper>
    )
}

const TextAreaWrapper = styled.div`
    display: inherit;
    flex-grow: 1;
    .textarea {
        ${tw`tw-bg-beige-200`}
        width: 100%;
        resize: none !important;
    }
`

export default AutoTextArea
