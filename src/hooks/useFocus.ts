import {useCallback, useState} from 'react'

const useFocus = () => {
    const [isFocus, setFocus] = useState(false)
    const onFocus = useCallback(() => setFocus(true), [])
    const onBlur = useCallback(() => setFocus(false), [])

    return [isFocus, onFocus, onBlur]
}

export default useFocus
