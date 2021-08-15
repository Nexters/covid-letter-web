import tw from 'twin.macro'

/** Ohsquare 계열 폰트의 weight는 고정 */
const FontOhsquare = tw`
    tw-font-ohsquare tw-font-bold
`
const FontOhsquareAir = tw`
    tw-font-ohsquare-air tw-font-light
`

type FontWeight = 'light' | 'normal' | 'semibold' | 'bold' // 사용하는 것만 정의
const FontNanumBarunGothic = (weight: FontWeight = 'normal') => {
    switch (weight) {
        case 'light':
            return tw`tw-font-nanumBarunGothic tw-font-light`
        case 'normal':
            return tw`tw-font-nanumBarunGothic tw-font-normal`
        case 'semibold':
            return tw`tw-font-nanumBarunGothic tw-font-semibold`
        case 'bold':
            return tw`tw-font-nanumBarunGothic tw-font-bold`
    }
}

export {FontOhsquare, FontOhsquareAir, FontNanumBarunGothic}
