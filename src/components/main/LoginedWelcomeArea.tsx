import styled from '@emotion/styled'
import tw from 'twin.macro'

const Container = styled.div`
    ${tw`tw-w-full`}
`

const Email = styled.div`
    ${tw`tw-text-left`}
    span {
        ${tw`tw-font-nanumBarunGothic tw-text-xs tw-text-beige-600 tw-bg-beige-300`}
        padding: .4rem .8rem;
        border-radius: 2rem;
    }
`

const Title = styled.div`
    ${tw`tw-text-left tw-font-ohsquare tw-font-bold tw-text-xl tw-text-primary-green-500`}
    margin-top: 1.2rem;
`
const WelcomeText = styled.div`
    ${tw`tw-text-left tw-font-ohsquare-air tw-font-normal tw-text-xl tw-text-primary-green-500`}
`

interface LoginedWelcomeAreaProps {
    email: string
    name: string
}

const LoginedWelcomeArea = ({email, name}: LoginedWelcomeAreaProps) => {
    return (
        <Container>
            <Email>
                <span>{email}</span>
            </Email>
            <Title>안녕하세요. {name}님.</Title>
            <WelcomeText>
                오늘도 나에게 편지를
                <br />
                남겨볼까요?
            </WelcomeText>
        </Container>
    )
}

export default LoginedWelcomeArea
