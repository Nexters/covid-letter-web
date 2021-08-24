import styled from '@emotion/styled'
import tw from 'twin.macro'
import NewLetterQuestion from '$components/question/Question'
import {withAxios} from '$utils/fetcher/withAxios'
import {Question} from '$types/response/letter'
import cookies from 'next-cookies'
import {GetServerSideProps} from 'next'
import Answer from '$components/question/Answer'
import ROUTES from '$constants/routes'
import {useAlertStore, useLetterStore} from '$contexts/StoreContext'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import CommonHeader from '$components/header/CommonHeader'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'

interface Props {
    questions: Question[]
}

const NewLetter = ({questions}: Props) => {
    const router = useRouter()
    const {answer, title, optionId, resetStore} = useLetterStore()
    const {confirm} = useAlertStore()
    useEffect(() => {
        if (!optionId) {
            router.push({pathname: ROUTES.COVID.LETTER.OPTION})
        }
    }, [])
    const onClickConfirm = () => {
        if (answer.length === 0 || title.length === 0) return
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW.ATTACH,
            query: {optionId: router.query.optionId},
        })
    }
    const onClickHeaderButton = () => {
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

    return (
        <>
            <CommonHeader type={HEADER_TYPE.BACK} position={HEADER_POSITION.LEFT} onClick={onClickHeaderButton} />
            <Container>
                <NewLetterQuestion questions={questions} />
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

const Container = styled.section`
    ${tw`tw-bg-beige-300 tw-flex tw-flex-col`}
    margin: 0 auto;
    text-align: center;
    min-height: calc(100vh - 5.5rem);
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
