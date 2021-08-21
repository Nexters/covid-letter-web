import {CSSProperties} from 'react'

function IconArrowDown({style, color}: {style: CSSProperties; color: string}) {
    return (
        <svg
            style={style}
            width="1.2rem"
            height="1.2rem"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 9V1M5 9L1 4.706M9 4.706L5 9"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconArrowDown
