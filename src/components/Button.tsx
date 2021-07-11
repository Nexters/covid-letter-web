import React, {ReactElement} from 'react'

const Button = ({children}: {children: ReactElement | string}) => {
    return <button>{children}</button>
}

export default Button
