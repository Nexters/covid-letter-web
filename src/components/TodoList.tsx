import classNames from 'classnames/bind'
import {FilterBase, useTodoListContext} from '../contexts/TodoListContext'
import styles from '$components/TodoList.module.scss'
import React, {useState} from 'react'
import {Todo} from '$types/response/todo'

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

interface FilterButton {
    text: string
    tag: FilterBase
}

const Filter = ({
    list,
    active,
    onFilter,
}: {
    list: FilterButton[]
    active: string
    onFilter: (tag: FilterBase) => void
}) => {
    return (
        <div className={cx('button-list')}>
            {list.map(({text, tag}) => (
                <button
                    key={tag}
                    className={cx('button', {active: active === tag})}
                    onClick={() => onFilter(tag)}>
                    {text}
                </button>
            ))}
        </div>
    )
}

const TodoList = () => {
    const {
        list,
        toggle,
        isEmptyTodoList,
        filter,
        activeTag,
        numOfTodos,
        deleteCompleteTodos,
        isLoading,
        update,
    } = useTodoListContext()

    const toggleComplete = (id: number) => {
        toggle(id)
    }

    const onFilter = (tag: FilterBase) => {
        filter(tag)
    }

    const updateTodos = () => {
        update()
        window.alert(`${numOfTodos}개의 할 일이 저장되었습니다.`)
    }

    return (
        <div className={cx('box')}>
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
            {isEmptyTodoList && !isLoading && (
                <div className={cx('empty')}>Empty!</div>
            )}
            {isLoading && (
                <div className={cx('loading')}>불러오는 중입니다...</div>
            )}
            <div className={cx('options')}>
                <span>
                    {numOfTodos > 0
                        ? `남은 할일: ${numOfTodos}개`
                        : `모두 완료했습니다! 👍`}
                </span>
                <Filter
                    list={[
                        {
                            text: '모두',
                            tag: FilterBase.ALL,
                        },
                        {
                            text: '완료',
                            tag: FilterBase.COMPLETE,
                        },
                        {
                            text: '미완료',
                            tag: FilterBase.INCOMPLETE,
                        },
                    ]}
                    active={activeTag}
                    onFilter={onFilter}
                />
            </div>
            <button
                className={cx('button-filter')}
                onClick={deleteCompleteTodos}>
                완료된 할일 삭제
            </button>{' '}
            <button className={cx('button-filter')} onClick={updateTodos}>
                저장
            </button>
        </div>
    )
}

export default TodoList
