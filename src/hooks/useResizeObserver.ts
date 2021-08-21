import {ResizeObserver} from '@juggle/resize-observer'
import {RefObject, useEffect} from 'react'
type ObserverCallback = (entry: DOMRectReadOnly) => void
const useResizeObserver = (ref: RefObject<HTMLElement>, callback: ObserverCallback) => {
    useEffect(() => {
        const ro = new ResizeObserver((entries) => {
            console.log('Body has resized!')
            callback(entries[0].contentRect)
        })
        if (!ref.current) {
            return
        }
        ro.observe(ref.current)
        return () => {
            ro.disconnect()
        }
    })
}

export default useResizeObserver
