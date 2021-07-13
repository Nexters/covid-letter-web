import React, {ReactElement} from 'react'

const Button = ({
    children,
    onClick,
}: {
    children: ReactElement | string
    onClick: () => void
}) => {
    return <button onClick={onClick}>{children}</button>
}

export default Button
