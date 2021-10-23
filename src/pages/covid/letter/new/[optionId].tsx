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
import {MainButton} from '$styles/utils/components'
import {isLocalEnv} from '$utils/env'

const NewLetter = ({
    questions,
    shouldTutorialOpen,
    isMobile,
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
            successText: '응, 뒤로 갈래!',
            cancelText: '아니!',
        })
        return
    }
    const checkNoData = title.trim().length === 0 || answer.trim().length === 0

    const {tutorialShow, closeTutorial} = useTutorial(shouldTutorialOpen)

    return (
        <>
            <CommonHeader type={HEADER_TYPE.BACK} position={HEADER_POSITION.LEFT} onClick={handleHeader} />
            <Container>
                <NewLetterQuestion questions={questions} />
                <BottomWrapper>
                    <Answer />
                    <ConfirmButton onClick={handleConfirm} disabled={checkNoData}>
                        확인
                    </ConfirmButton>
                </BottomWrapper>
            </Container>
            <TutorialLayer isMobile={isMobile} tutorialShow={tutorialShow} closeTutorial={closeTutorial} />
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
    if (!tutorialOpen && !isLocalEnv) {
        context.res?.setHeader('Set-Cookie', `tutorialOpen=${'opened'}; path=/; HttpOnly`)
    }

    return {props: {questions, shouldTutorialOpen: !tutorialOpen}}
}

const BottomWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 420px;
    width: 100%;
    margin: 0 auto;
`

const Container = styled.section`
    ${tw`tw-bg-beige-300 tw-flex tw-flex-col`}
    margin: 0 auto;
    text-align: center;
    justify-content: space-between;
`

const ConfirmButton = styled(MainButton)`
    ${tw`tw-relative tw-bottom-0`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
`
export default observer(NewLetter)
