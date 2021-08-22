import styled from '@emotion/styled'
import tw from 'twin.macro'

const ConfirmButton = styled.button`
    ${tw`tw-fixed tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    left: 0;
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
    
    &:disabled {
        ${tw`tw-bg-grey-300 tw-text-grey-400`}
    }
`

export default ConfirmButton
