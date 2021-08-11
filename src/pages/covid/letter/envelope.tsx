import HalfLayer from '$components/layer/HalfLayer'
import {GetServerSideProps} from 'next'
import {Letter} from '$types/response/letter'
import {withAxios} from '$utils/fetcher/withAxios'
import {formatDate} from '$utils/date'

/**
 * 이메일에서 첨부된 링크로 바로 접근하면 보이는 첫 화면 /covid/letter/envelope?id=a1b2c3d4e5f6~
 * background 비어있는 상태로 편지 봉투 모달만 보임
 */
const Envelope = ({letter}: Letter) => {
    const {title, state, sticker, createdDate, encryptedId} = letter;
    return (
        <HalfLayer isShow={true} closeFn={() => {}} visibleCloseButton={false} >
           <div>제목: {title}</div>
           <div>작성일: {formatDate(createdDate)}</div>
           <div>발송기준: -</div>
           <div>전송상태: {state} - UI 적용</div>
           <div>스티커: {sticker} - UI 적용</div>
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
