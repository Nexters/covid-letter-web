import {forwardRef} from 'react'

const PostCardColPattern = forwardRef<SVGSVGElement>((_props, ref) => {
    return (
        <svg
            ref={ref}
            width="1.6em"
            viewBox="0 0 16 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                display: 'inline-block',
            }}>
            <g clipPath="url(#bg-line=col_svg__clip0)">
                <path d="M16 74.802V.412H0v74.39h16z" fill="#FBF8ED" />
                <path d="M16 40.232v19.25L0 74.802v-19.25l16-15.32z" fill="#818D8A" />
                <path d="M16 3.032v19.26L0 37.612v-19.26l16-15.32z" fill="#EAC98F" />
            </g>
            <defs>
                <clipPath id="bg-line=col_svg__clip0">
                    <path fill="currentColor" transform="translate(0 .412)" d="M0 0h16v74.39H0z" />
                </clipPath>
            </defs>
        </svg>
    )
})

export default PostCardColPattern
