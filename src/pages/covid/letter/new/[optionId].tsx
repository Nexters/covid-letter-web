import styled from '@emotion/styled'
import tw from 'twin.macro'
import NewLetterQuestion from '$components/question/Question'
import {withAxios} from '$utils/fetcher/withAxios'
import {Question} from '$types/response/letter'
import cookies from 'next-cookies'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import Answer from '$components/question/Answer'
import ROUTES from '$constants/routes'
import {useLetterStore} from '$contexts/StoreContext'
import {useRouter} from 'next/router'
import {ReactChild, useRef, useState} from 'react'
import useResizeObserver from '$hooks/useResizeObserver'
import {css} from '@emotion/react'
import {observer} from 'mobx-react-lite'
import TutorialLayer from '$components/tutorial/TutorialLayer'
import useTutorial from '$hooks/useTutorial'
import {PropsFromApp} from '$types/index'

const NewLetter = ({
    questions,
    shouldTutorialOpen,
}: PropsFromApp<InferGetServerSidePropsType<typeof getServerSideProps>>) => {
    const router = useRouter()
    const {answer, title} = useLetterStore()
    const [viewportHeight, setViewportHeight] = useState(0)
    const [targetHeight, setTargetHeight] = useState(0)
    const [isKeyboardView, setIsKeyboardView] = useState(false)
    const onClickConfirm = () => {
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

    const {tutorialShow, closeTutorial} = useTutorial(shouldTutorialOpen)

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
            <TutorialLayer tutorialShow={tutorialShow} closeTutorial={closeTutorial} />
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {letterLogin, tutorialOpen} = cookies(context)
    const optionId = context.query.optionId
    const res = await withAxios<Question[]>({
        url: `/letters/options/${optionId}`,
        method: 'GET',
        headers: {
            Authorization: letterLogin,
        },
    })
    const questions = res

    /** 튜토리얼 한번 보고 더이상 띄우지 않기 */
    if (!tutorialOpen) {
        context.res?.setHeader('Set-Cookie', `tutorialOpen=${'opened'}; path=/; HttpOnly`)
    }

    return {props: {questions, shouldTutorialOpen: !tutorialOpen}}
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
              transform: translateY(-5.5rem);
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
export default observer(NewLetter)
