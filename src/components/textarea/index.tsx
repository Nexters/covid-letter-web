import React, {useEffect, useState, forwardRef} from 'react'
import styled from '@emotion/styled'
import {useLetterStore} from '$contexts/StoreContext'
import tw from 'twin.macro'
import {isMobileOnly} from 'react-device-detect'

let wholeHeight: number

const AutoTextArea = forwardRef<HTMLTextAreaElement, {maxHeight: number; placeholder: string}>(
    ({maxHeight, placeholder}, ref) => {
        const {answer, addAnswer} = useLetterStore()

        useEffect(() => {
            wholeHeight = window.innerHeight
        }, [])

        const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            addAnswer(event.target.value)
        }

        const viewHeight = maxHeight - 148

        const [isFocus, setIsFocus] = useState(false)
        const [isOpenKeyboard, setIsOpenKeyboard] = useState(false)

        const onFocus = () => setIsFocus(true)
        const onBlur = () => setIsFocus(false)

        const shouldResizeHeight = isMobileOnly && isFocus && isOpenKeyboard

        useEffect(() => {
            if (wholeHeight === maxHeight) {
                setIsOpenKeyboard(false)
            } else {
                setIsOpenKeyboard(true)
            }
        }, [maxHeight])

        return (
            <TextAreaWrapper>
                <textarea
                    value={answer}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    className={'textarea'}
                    style={{
                        height: shouldResizeHeight ? `${viewHeight}px` : `auto`,
                    }}
                    maxLength={1000}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    ref={ref}
                />
            </TextAreaWrapper>
        )
    },
)

const TextAreaWrapper = styled.div`
    display: inherit;
    flex-grow: 1;
    min-height: 8.5rem;
    .textarea {
        ${tw`tw-bg-beige-200`}
        width: 100%;
        resize: none !important;
    }
`

export default AutoTextArea
