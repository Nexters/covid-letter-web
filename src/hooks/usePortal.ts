import {isSSR} from '$utils/env'
import {ReactNode, useEffect, useMemo, useRef} from 'react'
import ReactDOM from 'react-dom'

const usePortal = () => {
    const portal = useRef<HTMLDivElement>()

    if (!portal.current && !isSSR) {
        const portalId = Math.random().toString(36).substring(2)

        portal.current = document.createElement('div')
        portal.current.id = `portal__${portalId}`
        document.body.appendChild(portal.current)
    }

    useEffect(() => {
        return () => {
            if (portal.current?.parentNode) {
                const {parentNode} = portal.current
                parentNode.removeChild(portal.current)
            }
        }
    }, [])

    const Portal = useMemo(
        () =>
            ({children}: {children: ReactNode}) => {
                return ReactDOM.createPortal(children, portal.current!)
            },
        [],
    )

    return {
        Portal,
    }
}

export default usePortal
