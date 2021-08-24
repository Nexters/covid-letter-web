import usePortal from '$hooks/usePortal'
import styled from '@emotion/styled'
import SkeletonLayer from './SkeletonLayer'

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2010;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
`

const TutorialLayer = ({tutorialShow, closeTutorial}: {tutorialShow: boolean; closeTutorial: () => void}) => {
    const {Portal} = usePortal()

    if (!tutorialShow) return null
    return (
        <Portal>
            <Container onClick={closeTutorial}>
                <SkeletonLayer />
            </Container>
        </Portal>
    )
}

export default TutorialLayer
