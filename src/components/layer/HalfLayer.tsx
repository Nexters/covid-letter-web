import usePortal from '$hooks/usePortal'
import {animated, useTransition} from 'react-spring'
import bezierEasing from 'bezier-easing'
import styled from '@emotion/styled'
import React, {PropsWithChildren} from 'react'

const Content = styled(animated.div)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: #fff;
    box-sizing: border-box;
    text-align: center;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 1rem;
`

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
`

const HeaderCloseButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
`

const Overlay = styled(animated.div)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #000;
    opacity: 0;
`

interface HalfLayerProps {
    isShow: boolean
    closeFn: (e: React.SyntheticEvent) => void
}

const HalfLayer = ({
    children,
    isShow,
    closeFn,
}: PropsWithChildren<HalfLayerProps>) => {
    const {Portal} = usePortal()

    const transitions = useTransition(isShow, {
        from: {transform: 'translate3d(0, 100%, 0)'},
        enter: {transform: 'translate3d(0, 0%, 0)'},
        leave: {transform: 'translate3d(0, 100%, 0)'},
        config: {
            duration: 300,
            easing: bezierEasing(0.33, 0, 0.2, 1),
        },
    })

    const overlayTransition = useTransition(isShow, {
        from: {opacity: 0},
        enter: {opacity: 0.5},
        leave: {opacity: 0},
        config: {
            duration: 300,
            easing: bezierEasing(0.33, 0, 0.2, 1),
        },
    })

    return (
        <Portal>
            {transitions((props, item) => {
                return (
                    item && (
                        <Container>
                            <Content style={props}>
                                {children}
                                <HeaderCloseButton onClick={closeFn}>
                                    닫기
                                </HeaderCloseButton>
                            </Content>
                            {overlayTransition((overlayProps, overlayItem) => {
                                return (
                                    overlayItem && (
                                        <Overlay
                                            style={overlayProps}
                                            onClick={closeFn}
                                        />
                                    )
                                )
                            })}
                        </Container>
                    )
                )
            })}
        </Portal>
    )
}

export default HalfLayer
