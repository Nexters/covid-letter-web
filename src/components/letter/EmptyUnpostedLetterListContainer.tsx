import styled from '@emotion/styled'
import {FlexCenter} from '$styles/utils/layout'
import tw from 'twin.macro'
import EmptyLetterImage from '$assets/images/EmptyLetterImage'

const EmptyUnpostedLetterListContainer = () => {
    return (
        <Container>
            <EmptyLetterImage />
            <SubTitle>
                <div className="text">
                    아직 부치지 못한 편지가 없어.
                    <br />
                    발송 기준을 정하지 못한 편지가 생기면 찾아와줘!
                </div>
            </SubTitle>
        </Container>
    )
}

const Container = styled.div`
    ${FlexCenter}
    ${tw`tw-flex-col`}
    margin-top: 7.6rem;
`

const SubTitle = styled.div`
    margin-top: 1.6rem;
    .text {
        ${tw`tw-text-sm tw-text-center tw-text-primary-green-500 tw-font-normal`}
    }
`

export default EmptyUnpostedLetterListContainer
