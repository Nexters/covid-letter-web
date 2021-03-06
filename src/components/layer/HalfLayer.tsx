import usePortal from '$hooks/usePortal'
import {animated, useTransition} from 'react-spring'
import bezierEasing from 'bezier-easing'
import styled from '@emotion/styled'
import React, {PropsWithChildren} from 'react'
import Overlay from '$components/overlay'
import {noop} from '$utils/index'

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
`

const Content = styled(animated.div)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    box-sizing: border-box;
    text-align: center;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 2.4rem;
`

interface HalfLayerProps {
    isShow: boolean
    isShowOverlay?: boolean
    bgColor?: string
    closeFn: (e: React.SyntheticEvent) => void
    onDestroyed?: () => void
}

const HalfLayer = ({
    children,
    isShow,
    isShowOverlay = true,
    closeFn,
    bgColor = '#fff',
    onDestroyed = noop,
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
        onDestroyed: (prevIsShow: boolean) => {
            if (prevIsShow) {
                onDestroyed()
            }
        },
    })

    return (
        <Portal>
            {transitions((props, item) => {
                return (
                    item && (
                        <Container>
                            <Content style={{...props, backgroundColor: bgColor}}>{children}</Content>
                            <Overlay shouldScrollLock isShow={isShowOverlay} position={'fixed'} closeFn={closeFn} />
                        </Container>
                    )
                )
            })}
        </Portal>
    )
}

export default HalfLayer
