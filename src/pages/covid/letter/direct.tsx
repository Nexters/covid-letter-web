import HalfLayer from '$components/layer/HalfLayer'
import {GetServerSideProps} from 'next'
import {Letter} from '$types/response/letter'
import {withAxios} from '$utils/fetcher/withAxios'
import Envelope from '$components/letter/Envelope'
import LetterEnvelopeImageImage from '$assets/images/LetterEnvelopeImage'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import {FlexStart} from '$styles/utils/layout'
import {FontOhsquareAir} from '$styles/utils/font'
import {noop} from '$utils/index'

/**
 * 이메일에서 첨부된 링크로 바로 접근하면 보이는 첫 화면 /covid/letter/direct?id=a1b2c3d4e5f6~
 * background 비어있는 상태로 편지 봉투 모달만 보임
 */
const Direct = ({letter}: {letter: Letter}) => {
    return (
        <Container>
            <TitleWrapper>
                <LetterEnvelopeImageImage />
                <span className="title-text">
                    과거의 내가,
                    <br/>
                    오늘의 나에게 보낸 편지
                </span>
            </TitleWrapper>
            <HalfLayer isShow={true} isShowOverlay={false} closeFn={noop}>
                <Envelope letter={letter}/>
            </HalfLayer>
        </Container>
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

const Container = styled.div`
    ${tw`tw-bg-beige-200`}
    min-height: 100vh;
    padding: 8.8rem 8.5rem 0;
`

const TitleWrapper = styled.div`
    ${FlexStart}
    ${tw`tw-flex-col`}
    
    .title-text {
        ${FontOhsquareAir}
        ${tw`tw-text-xl tw-text-primary-green-500 tw-text-center`}
        margin-top: 1.6rem;
        letter-spacing: -0.015em;
    }
`

export default Direct
