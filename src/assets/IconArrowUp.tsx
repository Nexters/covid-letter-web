import {CSSProperties} from 'react'

function IconArrowUp({color, style}: {color: string; style?: CSSProperties}) {
    return (
        <svg
            width="1.2rem"
            height="1.2rem"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}>
            <path
                d="M5 1.5v8M5 1.5l4 4.294M1 5.794L5 1.5"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconArrowUp
