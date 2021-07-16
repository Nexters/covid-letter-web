import React, {ReactNode} from 'react'

const Button = ({
    children,
    onClick,
}: {
    children: ReactNode | string
    onClick: () => void
}) => {
    return <button onClick={onClick}>{children}</button>
}

export default Button
