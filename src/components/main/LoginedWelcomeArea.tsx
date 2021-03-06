import {FontNanumBarunGothic, FontOhsquare, FontOhsquareAir} from '$styles/utils/font'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const Container = styled.div`
    ${tw`tw-w-full`}
`

const Email = styled.div`
    ${tw`tw-text-left`}
    span {
        ${FontNanumBarunGothic('normal')}
        ${tw`tw-text-xs tw-text-beige-600 tw-bg-beige-300`}
        padding: .4rem .8rem;
        border-radius: 2rem;
    }
`

const Title = styled.div`
    ${FontOhsquare}
    ${tw`tw-text-left tw-text-xl tw-text-primary-green-500`}
    margin-top: 1.2rem;
`
const WelcomeText = styled.div`
    ${FontOhsquareAir}
    ${tw`tw-text-left tw-text-xl tw-text-primary-green-500`}
`

interface LoginedWelcomeAreaProps {
    email: string
}

const LoginedWelcomeArea = ({email}: LoginedWelcomeAreaProps) => {
    return (
        <Container>
            <Email>
                <span>{email}</span>
            </Email>
            <Title>안녕, 나야!</Title>
            <WelcomeText>오늘도 편지를 남겨볼까?</WelcomeText>
        </Container>
    )
}

export default LoginedWelcomeArea
