import React, {useState} from 'react'

interface TodoInputProp {
    addTodo: ({contents}: {contents: string}) => void
}

const TodoInput = ({addTodo}: TodoInputProp) => {

    const [contents, setContents] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addTodo({contents})
        setContents('') //사실 addTodo 호출이 성공해야만 삭제하는게 맞다
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={contents} onChange={handleChange} style={{border: '1px solid', width: '300px'}}
                   placeholder='What needs to be done?' />
        </form>
    )
}

export default TodoInput
