import Header from '$components/header'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const Container = styled.div`
    min-height: 100vh;
    height: 100%;
`

const containerTw = tw`
    tw-bg-beige-300
`

const Main = () => {
    return (
        <Container css={containerTw}>
            <Header />
        </Container>
    )
}
export default Main
