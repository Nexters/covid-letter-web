import {GetServerSideProps} from 'next'
import {withAxios} from '$utils/fetcher/withAxios'
import {Letter, LetterState} from '$types/response/letter'
import {convertCommonDateFormat} from '$utils/date'
import {useRouter} from 'next/router'
import ROUTES from '$constants/routes'
import {useProfileContext} from '$contexts/ProfileContext'

const LetterDetail = ({letter}: {letter: Letter}) => {
    const {title, contents, createdDate} = letter
    const question = '코로나 전,\n가장 마지막에 여행을 다녀온 나라는\n어디인가요?' //todo be api 조회 시 questionText 조회되면 수정할 것

    const router = useRouter()
    const {profile} = useProfileContext()
    const finishReadLetter = () => {
        if (profile) { //로그인 되어 있는 경우
            router.push(ROUTES.COVID.LETTER.LIST)
            return
        }

        //로그인 되어 있지 않은 경우(이메일에서 바로 접근한 경우)
        //todo 로그인 유도 모달 띄우기
        console.log('로그인 유도 모달 open')
    }

    return (
        <>
            <div>질문: {question}</div>
            <div>작성날짜 | {convertCommonDateFormat(createdDate)}</div>
            <div>제목: {title}</div>
            <div>~~~~~~</div>
            <div>내용: {contents}</div>
            <button onClick={finishReadLetter}>다 읽었어요!</button>
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
