import {useTransition, animated} from 'react-spring'
import bezierEasing from 'bezier-easing'
import styled from '@emotion/styled'

type Position = 'fixed' | 'absolute'

const Content = styled(animated.div)`
    position: ${({position}: {position: Position}) => position};
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #000;
    opacity: 0;
`

interface OverlayProps {
    position: Position
    isShow: boolean
    closeFn: (e: React.SyntheticEvent) => void
}

const Overlay = ({position = 'fixed', isShow, closeFn}: OverlayProps) => {
    const transitions = useTransition(isShow, {
        from: {opacity: 0},
        enter: {opacity: 0.5},
        leave: {opacity: 0},
        config: {
            duration: 300,
            easing: bezierEasing(0.33, 0, 0.2, 1),
        },
    })

    return transitions((overlayProps, overlayItem) => {
        return overlayItem && <Content position={position} style={overlayProps} onClick={closeFn} />
    })
}

export default Overlay
