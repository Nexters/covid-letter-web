import styled from '@emotion/styled'
import tw from 'twin.macro'
import {FontNanumBarunGothic} from './font'

const MainButton = styled.button`
    ${FontNanumBarunGothic('bold')}
    ${tw`
        tw-border-primary-green-500 
        hover:tw-border-primary-green-600 
        focus:tw-border-primary-green-600 
        tw-bg-primary-green-500 
        hover:tw-bg-primary-green-600 
        focus:tw-bg-primary-green-600
        tw-text-grey-000 
        hover:tw-text-grey-000 
        focus:tw-text-grey-000
        tw-border-0 
        tw-text-base
    `}

    &:disabled {
        ${tw`
            tw-border-grey-300
            hover:tw-border-grey-300
            tw-bg-grey-300
            hover:tw-bg-grey-300
            focus:tw-bg-grey-300
            tw-text-grey-400 
            hover:tw-text-grey-400 
            focus:tw-text-grey-400
            tw-cursor-default
        `}
    }
`

export {MainButton}
