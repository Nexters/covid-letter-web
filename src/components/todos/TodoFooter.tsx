import {TODO_FILTER} from '$constants/todoFilter'

type TodoFooterProps = {
    todoFilter: TODO_FILTER,
    changeTodoFilter: (todoFilter: TODO_FILTER) => void
}

const TodoFooter = ({todoFilter: currentTodoFilter, changeTodoFilter}: TodoFooterProps) => {

    const baseButtonStyle = {
        margin: '5px 5px 0 0',
        border: '1px solid',
        padding: '0 5px',
    }

    const buttons = Object.values(TODO_FILTER).map(todoFilter => {
        const isSelected = todoFilter === currentTodoFilter
        const buttonStyle = {...baseButtonStyle, backgroundColor: isSelected ? '#52f6f1' : '#ffffff'}

        return (
            <button style={buttonStyle} key={todoFilter} onClick={() => changeTodoFilter(todoFilter)}>{todoFilter.toLowerCase()}</button>
        )
    })

    return (
        <>
            {buttons}
        </>
    )
}

export default TodoFooter
