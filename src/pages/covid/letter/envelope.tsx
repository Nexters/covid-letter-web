import HalfLayer from '$components/layer/HalfLayer'
import {GetServerSideProps} from 'next'
import {Letter} from '$types/response/letter'

/**
 * 이메일에서 첨부된 링크로 바로 접근하면 보이는 첫 화면 /covid/letter/envelope?id=a1b2c3d4e5f6~
 * background 비어있는 상태로 편지 봉투 모달만 보임
 */
const Envelope = ({letter}: Letter) => {
   return (
       <HalfLayer isShow={true} closeFn={() => {}} visibleCloseButton={false} >
           {letter.encryptedId}
       </HalfLayer>
   )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id: encryptedId} = context.query;
    //todo: encryptedId 로 BE /letter 편지 상세 API 조회

    return {
        props: {
            letter: {
                encryptedId,
            }
        }
    }
}

export default Envelope;
