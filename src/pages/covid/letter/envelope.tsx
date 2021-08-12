import HalfLayer from '$components/layer/HalfLayer'
import {GetServerSideProps} from 'next'
import {Letter, LetterState} from '$types/response/letter'
import {useAlertStore} from '$contexts/StoreContext'
import {useRouter} from 'next/router'
import {withAxios} from '$utils/fetcher/withAxios'
import {convertCommonDateFormat} from '$utils/date'
import ROUTES from '$constants/routes'

/**
 * 이메일에서 첨부된 링크로 바로 접근하면 보이는 첫 화면 /covid/letter/envelope?id=a1b2c3d4e5f6~
 * background 비어있는 상태로 편지 봉투 모달만 보임
 */
const Envelope = ({letter}: {letter: Letter}) => {
    const {title, state, sticker, createdDate, encryptedId} = letter;
    const isAvailableOpenLetter = state !== LetterState.PENDING;

    const router = useRouter()
    const {alert} = useAlertStore()
    const openLetter = () => {
        if (!isAvailableOpenLetter) {
            alert({
                title: '[TEXT 수정필요] 아직 편지를 열어 볼 수 없어요'
            })
            return;
        }

        router.push({pathname: ROUTES.COVID.LETTER.DETAIL, query: {encryptedId}})
    }

    return (
        <HalfLayer isShow={true} closeFn={() => {}} hasCloseButton={false} >
            <div>제목: {title}</div>
            <div>작성일: {convertCommonDateFormat(createdDate)}</div>
            <div>발송기준: -</div>
            <div>전송상태: {state} - UI 적용</div>
            <div>스티커: {sticker} - UI 적용</div>
            <button /**disabled={!isAvailableOpenLetter}**/ onClick={openLetter}>{isAvailableOpenLetter ? '뜯어볼래요' : '아직 열어볼 수 없어요'}</button>
        </HalfLayer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id: encryptedId} = context.query;
    const letter = await withAxios<Letter>({
        url: `/letters/${encryptedId}`,
        method: 'GET',
    })

    return {
        props: {
            letter,
        }
    }
}

export default Envelope;
