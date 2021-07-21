import React, {useState} from 'react'

interface TodoInputProp {
    addTodo: ({contents}: {contents: string}) => void
}

const TodoInput = ({addTodo}: TodoInputProp) => {

    const [contents, setContents] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addTodo({contents})
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={contents} onChange={handleChange} style={{border: '1px solid'}} />
        </form>
    )
}

export default TodoInput
