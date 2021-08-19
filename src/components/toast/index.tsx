import styled from '@emotion/styled'
import ReactDOM from 'react-dom'
import tw from 'twin.macro'
import {ReactNode} from 'react'
import {noop} from '$utils/index'
import {animated, Transition} from 'react-spring'
import {FlexCenter} from '$styles/utils/layout'

const Container = styled.div`
    ${FlexCenter}
    ${tw`tw-text-center`}
    box-sizing: border-box;
    position: fixed;
    bottom: 2.4rem;
    left: 0;
    right: 0;
    z-index: 2010;
`

const ToastList = styled.div`
    box-sizing: border-box;
`

const ToastBox = styled.div`
    ${tw`tw-font-nanumBarunGothic tw-text-sm tw-text-grey-000`}
    display: inline-block;
    background: rgba(34, 33, 31, 0.6);
    border-radius: 2rem;
    padding: 0.8rem 2.4rem;
    margin: 0.5rem 0;
`

type ToastOptions = {
    delay: number
    onClick: () => void
}

const defaultOptions: ToastOptions = {
    delay: 3000,
    onClick: noop,
}

type ToastMessage = {
    id: string
    component: ReactNode
}

const toastList: ToastMessage[] = []

const renderDOM = () => {
    const container = document.getElementById('toast_container')
    ReactDOM.render(
        <ToastList>
            {toastList.map(({id, component}) => (
                <Transition
                    key={id}
                    items={id}
                    from={{opacity: 0, transform: 'translate3d(0, 10px, 0)'}}
                    enter={{opacity: 1, transform: 'translate3d(0, 0, 0)'}}
                    leave={{opacity: 0, transform: 'translate3d(0, 10px, 0)'}}>
                    {(props) => <animated.div style={props}>{component}</animated.div>}
                </Transition>
            ))}
        </ToastList>,
        container,
    )
}

function toast(message: string, delay?: number): void
function toast(message: string, options?: ToastOptions): void
function toast(message: string, delayOrOptions?: number | ToastOptions): void {
    const {delay = defaultOptions.delay, onClick = noop} =
        typeof delayOrOptions === 'number' ? {delay: delayOrOptions} : delayOrOptions || {}

    renderDOM()

    const id = Date.now().toLocaleString()
    toastList.push({
        id,
        component: <ToastBox onClick={onClick}>{message}</ToastBox>,
    })

    renderDOM()
    setTimeout(() => {
        const index = toastList.findIndex((t) => t.id === id)
        toastList.splice(index, 1)
        renderDOM()
    }, delay)
}

export default toast

export const ToastContainer = () => {
    return <Container id={'toast_container'} />
}
