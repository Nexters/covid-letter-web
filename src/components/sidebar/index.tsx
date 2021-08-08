import usePortal from '$hooks/usePortal'
import {animated, useTransition} from 'react-spring'
import bezierEasing from 'bezier-easing'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import Overlay from '$components/overlay'
import {PropsWithChildren} from 'react'
import IconClose from 'assets/IconClose'
import {Button} from 'antd'

const Container = styled.div`
    ${tw`tw-bg-beige-200`}
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2000;
`

const Content = styled(animated.div)`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    background-color: #fff;
    box-sizing: border-box;
    text-align: center;
    padding: 2.4rem;
`

const Header = styled.div`
    ${tw`tw-flex tw-text-right tw-flex-1 tw-justify-end tw-items-center`}
`

interface SidebarProps {
    isShow: boolean
    closeFn: (e: React.SyntheticEvent) => void
}

const Sidebar = ({isShow, closeFn, children}: PropsWithChildren<SidebarProps>) => {
    const {Portal} = usePortal()

    const transitions = useTransition(isShow, {
        from: {transform: 'translate3d(100%, 0, 0)'},
        enter: {transform: 'translate3d(0%, 0, 0)'},
        leave: {transform: 'translate3d(100%, 0, 0)'},
        config: {
            duration: 300,
            easing: bezierEasing(0.33, 0, 0.2, 1),
        },
    })

    return (
        <Portal>
            {transitions(
                (props, item) =>
                    item && (
                        <Container>
                            <Content style={props}>
                                <Header>
                                    <Button type={'link'} css={tw`tw-p-0`}>
                                        <IconClose />
                                    </Button>
                                </Header>
                                {children}
                            </Content>
                            <Overlay isShow={isShow} position={'fixed'} closeFn={closeFn} />
                        </Container>
                    ),
            )}
        </Portal>
    )
}

export default Sidebar
