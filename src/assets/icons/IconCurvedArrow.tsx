function IconCurvedArrow({style}: {style: React.CSSProperties}) {
    return (
        <svg
            width="1.6rem"
            height="1.6em"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{display: 'inline-block', ...style}}>
            <path
                d="M11.467 1.027S4.857.396 6.285 5.249c1.07 3.197 4.7.563 2.443-.85-1.85-1.157-3.542.71-4.127 1.692-.585.983-2.169 5.519 4.338 7.911"
                stroke="#F6F4E8"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.595 15l1.914-.926-1.133-1.83"
                stroke="#F6F4E8"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconCurvedArrow
