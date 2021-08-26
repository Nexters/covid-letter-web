import styled from '@emotion/styled'
import {FlexCenter} from '$styles/utils/layout'
import tw from 'twin.macro'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'
import {MainButton} from '$styles/utils/components'
import EmptyLetterImage from '$assets/images/EmptyLetterImage'

const EmptyLetterListContainer = () => {
    const router = useRouter()
    const createNewLetter = () => {
        router.push({pathname: ROUTES.COVID.LETTER.OPTION})
    }

    return (
        <Container>
            <EmptyLetterImage />
            <SubTitle>
                <div className="text">
                    작성된 편지가 없어.
                    <br />
                    한번 편지를 쓰러 가볼까?
                </div>
            </SubTitle>
            <CreateLetterButton onClick={createNewLetter}>편지 작성</CreateLetterButton>
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

const CreateLetterButton = styled(MainButton)`
    ${tw`tw-w-full`}
    margin-top: 2.4rem;
    padding: 1.5rem 0;
    border-radius: 0.4rem;
`

export default EmptyLetterListContainer
