import styled from '@emotion/styled'
import IconBack from 'assets/icons/IconBack'
import {useRouter} from 'next/router'
import tw from 'twin.macro'

type ContainerProps = {
    backgroundColor: string
}

const Container = styled.div`
    ${tw`tw-absolute`}
    left: 0%;
    right: 0%;
    height: 5.6rem;
    padding: 1.6rem;
    background-color: ${({backgroundColor}: ContainerProps) => backgroundColor};
`

type BackProps = {
    backgroundColor?: string
}

const Back = ({backgroundColor = 'var(--beige-300)'}: BackProps) => {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <Container backgroundColor={backgroundColor}>
            <button onClick={handleBack}>
                <IconBack width={'2.4rem'} height={'2.4rem'} />
            </button>
        </Container>
    )
}

export default Back
