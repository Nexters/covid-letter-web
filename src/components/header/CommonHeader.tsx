import styled from '@emotion/styled'
import BackSvg from 'assets/BackSvg'
import IconClose from 'assets/IconClose'
import tw from 'twin.macro'
import {HEADER_POSITION} from './constants'
import {HeaderPosition, HeaderType} from './types'

const Container = styled.div`
    ${tw`tw-fixed`}
    top: 0;
    left: 0;
    right: 0;
    padding: 1.6rem;
    text-align: ${({position}: {position: HeaderPosition}) => position};
`

type CommonHeaderProps = {
    type: HeaderType
    position?: HeaderPosition
    onClick?: (e?: React.SyntheticEvent) => void
}

const CommonHeader = ({type, onClick, position = HEADER_POSITION.LEFT}: CommonHeaderProps) => {
    return (
        <Container position={position}>
            {(() => {
                switch (type) {
                    case 'BACK':
                        return (
                            <button onClick={onClick}>
                                <BackSvg width={'2.4rem'} height={'2.4rem'} />
                            </button>
                        )
                    case 'CLOSE':
                        return (
                            <button>
                                <IconClose />
                            </button>
                        )
                    default:
                        return null
                }
            })()}
        </Container>
    )
}

export default CommonHeader
