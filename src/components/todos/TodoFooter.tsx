const TodoFooter = () => {
    const buttonStyle = {
        margin: '5px 5px 0 0',
        border: '1px solid',
        padding: '0 5px',
    }

    return (
        <>
            <button style={buttonStyle}>all</button>
            <button style={buttonStyle}>active</button>
            <button style={buttonStyle}>completed</button>
        </>
    )
}

export default TodoFooter
