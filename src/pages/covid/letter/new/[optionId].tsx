import styled from '@emotion/styled'
import tw from 'twin.macro'
import NewLetterQuestion from '$components/question/Question'
import {withAxios} from '$utils/fetcher/withAxios'
import {Question} from '$types/response/letter'
import cookies from 'next-cookies'
import {GetServerSideProps} from 'next'
import Answer from '$components/question/Answer'
import ROUTES from '$constants/routes'
import {useLetterStore} from '$contexts/StoreContext'
import {useRouter} from 'next/router'
import {ReactChild, useRef, useState} from 'react'
import useResizeObserver from '$hooks/useResizeObserver'
import {css} from '@emotion/react'

interface Props {
    questions: Question[]
}

const NewLetter = ({questions}: Props) => {
    const router = useRouter()
    const {answer, title} = useLetterStore()
    const [viewportHeight, setViewportHeight] = useState(0)
    const [targetHeight, setTargetHeight] = useState(0)
    const [isKeyboardView, setIsKeyboardView] = useState(false)
    const onClickConfirm = () => {
        console.log('here')
        if (answer.length === 0 || title.length === 0) return
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW.ATTACH,
            query: {optionId: router.query.optionId},
        })
    }
    const ref = useRef(null)
    const callback = (entry: any) => {
        setTargetHeight(entry.height)
        setViewportHeight(document.body.clientHeight)
        if (targetHeight / viewportHeight > 1) setIsKeyboardView(true)
        else setIsKeyboardView(false)
    }
    useResizeObserver(ref, callback)

    return (
        <>
            <Header isKeyboardView={isKeyboardView} />
            <Container ref={ref}>
                {isKeyboardView ? <></> : <NewLetterQuestion questions={questions} />}
                <div>
                    <Answer />
                    <ConfirmButton onClick={onClickConfirm}>확인</ConfirmButton>
                </div>
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {letterLogin} = cookies(context)
    const optionId = context.query.optionId
    const res = await withAxios<Question[]>({
        url: `/letters/options/${optionId}`,
        method: 'GET',
        headers: {
            Authorization: letterLogin,
        },
    })
    const questions = res

    return {props: {questions}}
}

type PropsType = {
    children?: ReactChild
    isKeyboardView: boolean
}

const Container = styled.section`
    ${tw`tw-bg-beige-300 tw-flex tw-flex-col`}
    margin: 0 auto;
    text-align: center;
    min-height: calc(100vh - 5.5rem);
    justify-content: space-between;
`
const Header = styled.section<PropsType>(({isKeyboardView}) =>
    isKeyboardView
        ? css`
              height: 0;
              margin-top: -5.5rem;
          `
        : css`
              height: 5.5rem;
          `,
)

const ConfirmButton = styled.button`
    ${tw`tw-relative tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`
export default NewLetter
