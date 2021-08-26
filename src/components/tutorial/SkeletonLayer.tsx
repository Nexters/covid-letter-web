import IconCurvedArrow from '$assets/icons/IconCurvedArrow'
import IconEraser from '$assets/icons/IconEraser'
import CommonHeader from '$components/header/CommonHeader'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'
import {FontNanumBarunGothic} from '$styles/utils/font'
import styled from '@emotion/styled'
import {CSSProperties, ReactNode, useEffect, useRef, useState} from 'react'
import tw from 'twin.macro'

const Container = styled.section`
    ${tw`tw-flex tw-flex-col`}
    margin: 0 auto;
    text-align: center;
    justify-content: space-between;
`

const BottomWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: 420px;
    width: 100%;
    margin: 0 auto;
`

const QuestionContainer = styled.section`
    ${tw`tw-flex-col tw-justify-between tw-items-center `}
    min-width: 100%;
    position: relative;
`
const QuestionWrapper = styled.div`
    margin: 1.6rem 1.4rem 2.4rem;
    position: relative;

    .question-number {
        ${FontNanumBarunGothic()}
        ${tw`tw-text-primary-yellow-400 tw-text-sm`}
    }

    h3 {
        ${tw`tw-font-ohsquare-air tw-text-primary-green-500`}
        margin-top: 1.7rem;
        margin-bottom: 1.2rem;
        font-size: 2rem;
        line-height: 3.2rem;
        color: transparent;
    }

    .create-date {
        ${tw`tw-font-nanumBarunGothic tw-text-grey-600 tw-text-sm`}
        color: transparent;
    }
`

const ButtonList = styled.div`
    div {
        ${tw`tw-text-center`}
    }

    & > div + div {
        margin-top: 1.2rem;
    }
`

const Button = styled.button`
    ${FontNanumBarunGothic()}
    ${tw`tw-border tw-border-primary-yellow-400
        tw-text-primary-yellow-400
        tw-text-sm
    `}
    min-width: 16.2rem;
    margin: 0 auto;
    padding: 1rem 1.6rem;
    height: 4.2rem;
    box-sizing: border-box;
    border-radius: 0.4rem;
`

const LinkButton = styled.a`
    ${FontNanumBarunGothic()}
    ${tw`tw-text-primary-yellow-400 tw-text-sm tw-border-0`}
    padding-top: 1.2rem;
    text-decoration: underline;
    text-underline-position: under;
    width: fit-content;
`

const AnswerWrapper = styled.section`
    ${tw`tw-flex tw-flex-col`}
    bottom: 5.2rem;
    padding: 3.2rem 2.4rem 1.6rem;
    letter-spacing: -0.015em;
    border-radius: 1rem;
    min-height: 40vh;
    .divider {
        ${tw`tw-border-t-2 tw-border-dashed`}
        margin-top: 0.8rem;
        margin-bottom: 2.4rem;
        border-color: transparent;
    }
`

const TitleInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 19.5rem;
    font-size: 1.8rem;
    height: 4.2rem;

    input {
        line-height: 2.5rem;
        visibility: hidden;
    }

    .title-length {
        font-size: 1.2rem;
        line-height: 1.4rem;
    }
`

const AnswerInputWrapper = styled.div`
    ${FontNanumBarunGothic()}
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    font-size: 1.4rem;
    line-height: 2.2rem;
    min-height: 100%;

    .answer {
        width: 100%;
    }
    .sub-items {
        ${tw`tw-text-sm`}
        display: inherit;
        justify-content: space-between;
        margin-top: 2.4rem;
        .answer-length {
        }
        .reset-button {
            ${tw`tw-text-primary-yellow-400`}
        }
    }
`

const TextAreaWrapper = styled.div`
    display: inherit;
    flex-grow: 1;
    min-height: 8.5rem;
    .textarea {
        height: 110px !important;
        width: 100%;
        resize: none !important;
        visibility: hidden;
    }
`

const ConfirmButton = styled.button`
    ${tw`tw-relative tw-bottom-0`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`

const TutorialWrapper = styled.div`
    ${FontNanumBarunGothic()}
    ${tw`tw-text-beige-200 tw-text-sm`}
    position: absolute;
    left: 0;
    right: 0;
    ${({style}) => {
        return {
            ...style,
        }
    }}

    .text {
        margin-bottom: 0.4rem;
    }
    .text-bottom {
        margin-top: 0.4rem;
    }
`

const DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN',
} as const
type Direction = typeof DIRECTION[keyof typeof DIRECTION]

const TutorialMessage = ({
    text,
    direction,
    target,
    style,
    textBottom = false,
    spacing = 1.6,
}: {
    text: string | ReactNode
    direction: Direction
    target?: DOMRectList
    style?: CSSProperties
    textBottom?: boolean
    spacing?: number
}) => {
    const targetWidth = target ? Array.prototype.slice.call(target)[0].width : 0

    return (
        <TutorialWrapper style={style}>
            {!textBottom && <div className="text">{text}</div>}
            <div
                className="icon"
                style={{
                    marginRight: `${targetWidth / 10 + spacing}rem`,
                }}>
                <IconCurvedArrow
                    style={
                        direction === DIRECTION.UP
                            ? {
                                  transform: `scaleY(-1)`,
                              }
                            : {}
                    }
                />
            </div>
            {textBottom && <div className="text-bottom">{text}</div>}
        </TutorialWrapper>
    )
}

type SkeletonLayerState = {
    [key: number]: DOMRectList
}

const SkeletonLayer = () => {
    const unknownList = [] as unknown as DOMRectList
    const [, setRectList] = useState<SkeletonLayerState>({
        1: unknownList,
        2: unknownList,
        3: unknownList,
        4: unknownList,
    })
    const tutoRef1 = useRef<HTMLSpanElement>(null)
    const tutoRef2 = useRef<HTMLButtonElement>(null)
    const tutoRef3 = useRef<HTMLAnchorElement>(null)
    const tutoRef4 = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        setRectList({
            1: tutoRef1.current?.getClientRects() || unknownList,
            2: tutoRef2.current?.getClientRects() || unknownList,
            3: tutoRef3.current?.getClientRects() || unknownList,
            4: tutoRef4.current?.getClientRects() || unknownList,
        })
    }, [])
    return (
        <>
            <CommonHeader
                type={HEADER_TYPE.BACK}
                position={HEADER_POSITION.LEFT}
                style={{
                    backgroundColor: 'transparent',
                }}
            />
            <Container>
                <QuestionContainer>
                    <QuestionWrapper>
                        <TutorialMessage
                            text="편지쓰기를 도와주는 질문이야!"
                            direction={DIRECTION.DOWN}
                            target={tutoRef1.current?.getClientRects()}
                            style={{
                                top: '-4rem',
                            }}
                        />
                        <span className="question-number" ref={tutoRef1}>
                            질문 1
                        </span>
                        <h3>
                            TEST
                            <br />
                            TEST
                        </h3>
                        <span className="create-date">test</span>
                    </QuestionWrapper>
                    <TutorialMessage
                        text={
                            <>
                                현재 질문에 대답하기 어렵다면,
                                <br />
                                다른 질문으로 넘어갈 수 있어!
                            </>
                        }
                        direction={DIRECTION.UP}
                        target={tutoRef2.current?.getClientRects()}
                        style={{
                            bottom: '7.2rem',
                        }}
                    />
                    <ButtonList>
                        <div>
                            <Button ref={tutoRef2}>다른 질문에 대답할래</Button>
                        </div>
                        <div>
                            <LinkButton ref={tutoRef3}>오늘은 자유롭게 쓸래</LinkButton>
                        </div>
                    </ButtonList>
                    <TutorialMessage
                        text={
                            <>
                                질문을 받지 않고 자유롭게
                                <br />
                                편지쓰고 싶을 때 클릭해줘!
                            </>
                        }
                        direction={DIRECTION.DOWN}
                        target={tutoRef3.current?.getClientRects()}
                        style={{
                            bottom: '-7.2rem',
                        }}
                        textBottom
                    />
                </QuestionContainer>
                <BottomWrapper>
                    <AnswerWrapper>
                        <TitleInputWrapper>
                            <input />
                            <span className="title-length"></span>
                        </TitleInputWrapper>
                        <hr className="divider" />
                        <AnswerInputWrapper>
                            <TextAreaWrapper>
                                <textarea className="textarea" />
                            </TextAreaWrapper>
                            <TutorialMessage
                                text={
                                    <>
                                        내용이 마음에 안든다면?
                                        <br />
                                        지우개로 지워봐!
                                    </>
                                }
                                direction={DIRECTION.UP}
                                target={tutoRef4.current?.getClientRects()}
                                style={{
                                    bottom: '1rem',
                                    textAlign: 'right',
                                }}
                                spacing={0}
                            />
                            <div className="sub-items">
                                <span className="answer-length"></span>
                                <button className="reset-button" ref={tutoRef4}>
                                    <IconEraser />
                                    전부 지우기
                                </button>
                            </div>
                        </AnswerInputWrapper>
                    </AnswerWrapper>
                    <ConfirmButton></ConfirmButton>
                </BottomWrapper>
            </Container>
        </>
    )
}

export default SkeletonLayer
