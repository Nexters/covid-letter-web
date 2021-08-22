import {GetServerSideProps} from 'next'
import {withAxios} from '$utils/fetcher/withAxios'
import {Letter, LetterState} from '$types/response/letter'
import {convertCommonDateFormat} from '$utils/date'
import {useRouter} from 'next/router'
import ROUTES from '$constants/routes'
import {useProfileContext} from '$contexts/ProfileContext'
import HalfLayer from '$components/layer/HalfLayer'
import {useState} from 'react'

const ServicePromotion = () => {
    const router = useRouter()

    return (
        <>
            과거에서부터 나에게 온
            편지가 어땠어?
            오늘 받아본 편지를 읽고
            위로가 되었다면,

            <br />
            미래의 나에게 편지 써보지 않을래?
            <br />

            <button onClick={() => router.push(ROUTES.LOGIN)}>로그인하고 편지쓸래!</button>
            <br />

            <button onClick={() => router.push(ROUTES.COVID.SIDE.ABOUT)}>서비스 먼저 구경할래</button>
        </>
    )
}

const LetterDetail = ({letter}: {letter: Letter}) => {
    const router = useRouter()
    const {profile} = useProfileContext()
    const [isShowServicePromotion, setIsShowServicePromotion] = useState<boolean>(false)

    const {title, contents, createdDate, questionText} = letter
    const finishReadLetter = () => {
        if (profile?.id) {
            router.push(ROUTES.COVID.LETTER.LIST)
            return
        }

        setIsShowServicePromotion(true)
    }

    return (
        <>
            <div>질문: {questionText}</div>
            <div>작성날짜 | {convertCommonDateFormat(createdDate)}</div>
            <div>제목: {title}</div>
            <div>~~~~~~</div>
            <div>내용: {contents}</div>
            <button onClick={finishReadLetter}>다 읽었어요!</button>
            <HalfLayer isShow={isShowServicePromotion} closeFn={() => setIsShowServicePromotion(false)}>
                <ServicePromotion />
            </HalfLayer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {encryptedId} = context.query;
    const letter = await withAxios<Letter>({
        url: `/letters/${encryptedId}`,
        method: 'GET',
    })

    if (letter.state === LetterState.SEND) {
        //todo 읽음처리 API 호출(호출결과 기다릴 필요없음)
        console.log('읽음처리: ', encryptedId)
    }

    return {
        props: {
            letter,
        }
    }
}

export default LetterDetail
