function GoogleLogo({style}: {style: React.CSSProperties}) {
    return (
        <svg
            width="1.6rem"
            height="1.6rem"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 6v2.4h3.97c-.16 1.03-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42S4.61 2.58 7 2.58c1.36 0 2.27.58 2.79 1.08l1.9-1.83C10.47.69 8.89 0 7 0 3.13 0 0 3.13 0 7s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16H7z"
                fill="currentColor"
            />
        </svg>
    )
}

export default GoogleLogo
