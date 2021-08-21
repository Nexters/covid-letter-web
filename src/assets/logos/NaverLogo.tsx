import React from 'react'

function NaverLogo({style}: {style: React.CSSProperties}) {
    return (
        <svg
            width="1.6rem"
            height="1.6rem"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}>
            <path d="M11 8.49L5.803 1H1.5v14h4.512V7.51L11.196 15H15.5V1H11v7.49z" fill="#03C75A" />
        </svg>
    )
}

export default NaverLogo
