import React, {useState, useEffect, useRef, TextareaHTMLAttributes} from 'react'
import styled from '@emotion/styled'

const AutoTextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [text, setText] = useState('')
    const [textAreaHeight, setTextAreaHeight] = useState('calc(100% - 5.2rem)')
    const [parentHeight, setParentHeight] = useState('calc(100% - 5.2rem)')

    useEffect(() => {
        setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
        setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`)
    }, [text])

    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaHeight('auto')
        setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
        setText(event.target.value)

        if (props.onChange) {
            props.onChange(event)
        }
    }

    return (
        <div>
            <TextArea
                {...props}
                ref={textAreaRef}
                rows={1}
                style={{
                    height: textAreaHeight,
                }}
                maxLength={1000}
                placeholder="질문에 대하여 편하게 대답해주시고, 그 외에 하고싶은 말을 자유롭게 적어주세요."
                onChange={onChangeHandler}
            />
        </div>
    )
}

const TextArea = styled.textarea`
    height: 20rem;
    resize: none !important;
`

export default AutoTextArea
