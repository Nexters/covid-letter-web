import usePortal from '$hooks/usePortal'
import {animated, useTransition} from 'react-spring'
import bezierEasing from 'bezier-easing'
import styled from '@emotion/styled'
import {PropsWithChildren} from 'react'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
`

const HeaderCloseButton = styled.button``

interface HalfLayerProps {
    isShow: boolean
    onDestroyed: () => void
}

const HalfLayer = ({
    children,
    isShow,
    onDestroyed,
}: PropsWithChildren<HalfLayerProps>) => {
    const {Portal} = usePortal()

    const transitions = useTransition(isShow, {
        from: {transform: 'translate3d(0, 100%, 0)'},
        enter: {transform: 'translate3d(0, 0, 0)'},
        leave: {transform: 'translate3d(0, 100%, 0)'},
        config: {
            duration: 300,
            easing: bezierEasing(0.33, 0, 0.2, 1),
        },
        onDestroyed,
    })

    return (
        <Portal>
            {transitions((props, item) => {
                return (
                    item && (
                        <Container>
                            <animated.div style={props}>
                                {children}
                                <HeaderCloseButton></HeaderCloseButton>
                            </animated.div>
                        </Container>
                    )
                )
            })}
        </Portal>
    )
}

export default HalfLayer
