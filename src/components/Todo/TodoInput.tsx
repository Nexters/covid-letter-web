import {forwardRef, useImperativeHandle, useState} from 'react'
import {useTodoListContext} from '$hooks/useTodoList'

const TodoInput = forwardRef((_, ref) => {
    const {add} = useTodoListContext()

    const [value, setValue] = useState('')
    useImperativeHandle(ref, () => ({value}), [value])

    const handleKeyPress = ({key}: {key: string}) => {
        if (key === 'Enter') {
            add(value)
            setValue('')
        }
    }
    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
        />
    )
})

export default TodoInput
