import HalfLayer from '$components/layer/HalfLayer'
import {GetServerSideProps} from 'next'
import {Letter} from '$types/response/letter'
import {withAxios} from '$utils/fetcher/withAxios'
import Envelope from '$components/letter/Envelope'

/**
 * 이메일에서 첨부된 링크로 바로 접근하면 보이는 첫 화면 /covid/letter/direct?id=a1b2c3d4e5f6~
 * background 비어있는 상태로 편지 봉투 모달만 보임
 */
const Direct = ({letter}: {letter: Letter}) => {
    return (
        <HalfLayer isShow={true} isShowOverlay={false} closeFn={() => {}}>
            <Envelope letter={letter}/>
        </HalfLayer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id: encryptedId} = context.query
    const letter = await withAxios<Letter>({
        url: `/letters/${encryptedId}`,
        method: 'GET',
    })

    return {
        props: {
            letter,
        },
    }
}

export default Direct
