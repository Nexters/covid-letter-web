import styled from '@emotion/styled'
import tw from 'twin.macro'
import NewLetterQuestion from '$components/question/Question'
import {withAxios} from '$utils/fetcher/withAxios'
import {Question} from '$types/response/letter'
import cookies from 'next-cookies'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import Answer from '$components/question/Answer'
import ROUTES from '$constants/routes'
import {useAlertStore, useLetterStore} from '$contexts/StoreContext'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import TutorialLayer from '$components/tutorial/TutorialLayer'
import useTutorial from '$hooks/useTutorial'
import {PropsFromApp} from '$types/index'
import CommonHeader from '$components/header/CommonHeader'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'

const NewLetter = ({
    questions,
    shouldTutorialOpen,
}: PropsFromApp<InferGetServerSidePropsType<typeof getServerSideProps>>) => {
    const router = useRouter()
    const {answer, title, optionId, resetStore} = useLetterStore()
    const {confirm} = useAlertStore()
    useEffect(() => {
        if (!optionId) {
            router.push({pathname: ROUTES.COVID.LETTER.OPTION})
        }
    }, [])
    const handleConfirm = () => {
        if (answer.length === 0 || title.length === 0) return
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW.ATTACH,
            query: {optionId: router.query.optionId},
        })
    }
    const handleHeader = () => {
        confirm({
            title: '아직 편지 내용이 저장되지 않았어!',
            message: '해당 페이지를 벗어나면\n편지 내용이 저장되지 않고 지워져!\n그래도 뒤로 갈거야?',
            onSuccess: () => {
                router.push(ROUTES.COVID.LETTER.OPTION)
                resetStore()
            },
            successText: '응, 할래!',
            cancelText: '아니, 안할래',
        })
        return
    }

    const {tutorialShow, closeTutorial} = useTutorial(shouldTutorialOpen)

    return (
        <>
            <CommonHeader type={HEADER_TYPE.BACK} position={HEADER_POSITION.LEFT} onClick={handleHeader} />
            <Container>
                <NewLetterQuestion questions={questions} />
                <BottomWrapper>
                    <Answer />
                    <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
                </BottomWrapper>
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

const BottomWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: 420px;
    width: 100%;
    margin: 0 auto;
`

const Container = styled.section`
    ${tw`tw-bg-beige-300 tw-flex tw-flex-col`}
    margin: 0 auto;
    text-align: center;
    justify-content: space-between;
`

const ConfirmButton = styled.button`
    ${tw`tw-relative tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`
export default observer(NewLetter)
