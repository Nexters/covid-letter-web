import classNames from 'classnames/bind'
import {Todo, useTodoListContext} from '../contexts/TodoListContext'
import styles from '$components/TodoList.module.scss'
import React, {useState} from 'react'

const cx = classNames.bind(styles)

const TodoItem = ({
    id,
    title,
    complete,
    onChange,
}: Partial<Todo> & {onChange: () => void}) => {
    const {delete: deleteTodo} = useTodoListContext()
    const [isFocus, setIsFocus] = useState(false)
    const onFocus = () => {
        setIsFocus(true)
    }
    const onBlur = () => setIsFocus(false)

    const onMouseDown = (e: React.SyntheticEvent) => {
        e.preventDefault()
        deleteTodo(id!)
    }

    return (
        <>
            <div
                className={cx('info')}
                onMouseOver={onFocus}
                onMouseOut={onBlur}
                onMouseUpCapture={onFocus}
                onMouseOutCapture={onBlur}>
                <div>
                    <input
                        type="checkbox"
                        id={`complete-${id}`}
                        className={cx('blind')}
                        onChange={onChange}
                    />
                    <label
                        className={cx('label', {done: complete})}
                        htmlFor={`complete-${id}`}>
                        {complete ? '●' : '○'}
                    </label>
                    <strong className={cx('title')}>{title}</strong>
                </div>
                <button
                    className={cx('button', 'delete')}
                    onMouseDown={onMouseDown}>
                    {isFocus && '✕'}
                </button>
            </div>
        </>
    )
}

const Input = () => {
    const {insert} = useTodoListContext()
    const [title, setTitle] = useState<string>('')

    const handleChange = ({target}: {target: HTMLInputElement}) => {
        setTitle(target.value)
    }

    const handleKeyPress = ({key}: {key: string}) => {
        if (key === 'Enter') {
            insert(title)
            setTitle('')
        }
    }

    return (
        <div className={cx('insert-area')}>
            <input
                type="text"
                id={'insert-todo'}
                className={cx('input')}
                value={title}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="새 할일을 추가해보세요."
            />
            <label className={cx('blind')} htmlFor={`insert-todo`}>
                새 할일 추가
            </label>
        </div>
    )
}

const TodoList = () => {
    const {list, toggle, isEmptyTodoList} = useTodoListContext()
    const toggleComplete = (id: number) => {
        toggle(id)
    }

    return (
        <div className={cx('box')}>
            {isEmptyTodoList && <div className={cx('empty')}>Empty!</div>}
            <Input />
            {list.map(({id, title, complete}) => (
                <TodoItem
                    key={id}
                    id={id}
                    title={title}
                    complete={complete}
                    onChange={() => toggleComplete(id)}
                />
            ))}
        </div>
    )
}

export default TodoList
