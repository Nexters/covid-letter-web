import usePortal from '$hooks/usePortal'
import styled from '@emotion/styled'
import SkeletonLayer from './SkeletonLayer'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2010;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.5);
`

const TutorialLayer = ({
    tutorialShow,
    closeTutorial,
    isMobile,
}: {
    tutorialShow: boolean
    closeTutorial: () => void
    isMobile: boolean
}) => {
    const {Portal} = usePortal()

    if (!tutorialShow) return null
    return (
        <Portal>
            <Container onClick={closeTutorial}>
                <SkeletonLayer isMobile={isMobile} />
            </Container>
        </Portal>
    )
}

export default TutorialLayer
