import styled from '@emotion/styled'
import {FlexCenter} from '$styles/utils/layout'
import tw from 'twin.macro'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'

const EmptyLetterListContainer = () => {
    const router = useRouter()
    const createNewLetter = () => {
        router.push({pathname: ROUTES.COVID.LETTER.OPTION})
    }

    return (
        <Container>
            <SubTitle>
                <span className="text">작성된 편지가 없어.<br/>한번 편지를 쓰러 가볼까?</span>
            </SubTitle>
            <CreateLetterButton onClick={createNewLetter}>
                <span className="text">편지 작성</span>
            </CreateLetterButton>
        </Container>
    )
}

const Container = styled.div`
    margin-top: 20.7rem;
    
    .btn {
        margin-top: 3.2rem;
        ${FlexCenter}
        ${tw`tw-bg-primary-green-500 tw-w-full`}
        height: 5.2rem;
        border-radius: 0.4rem;
        
        .text {
            font-family: Cafe24 Ohsquare;
            font-weight: bold;
            font-size: 16px;
            line-height: 25px;
            ${tw`tw-text-grey-000`} 
        }
    }
`

const SubTitle = styled.div`
    ${FlexCenter}
    .text {
        ${tw`tw-text-base tw-text-center tw-text-primary-green-500 tw-font-normal`}
    }
`

const CreateLetterButton = styled.button`
    margin-top: 3.2rem;
    ${FlexCenter}
    ${tw`tw-bg-primary-green-500 tw-w-full`}
    height: 5.2rem;
    border-radius: 0.4rem;
        
    .text {
        font-family: Cafe24 Ohsquare;
        font-weight: bold;
        font-size: 16px;
        line-height: 25px;
        ${tw`tw-text-grey-000`} 
    } 
`

export default EmptyLetterListContainer
