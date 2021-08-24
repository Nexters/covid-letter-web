import styled from '@emotion/styled'
import IconBack from 'assets/icons/IconBack'
import IconClose from 'assets/icons/IconClose'
import {CSSProperties} from 'react'
import tw from 'twin.macro'
import {HEADER_POSITION} from './constants'
import {HeaderPosition, HeaderType} from './types'

type ContainerProps = {
    isFixed: boolean
    position: HeaderPosition
}

const Container = styled.div`
    ${tw`tw-bg-beige-300`}
    position: ${({isFixed}: ContainerProps) => (isFixed ? 'fixed' : 'relative')};
    top: 0;
    left: 0;
    right: 0;
    padding: 1.6rem;
    max-width: 420px;
    margin: 0 auto;
    width: 100%;
    text-align: ${({position}: ContainerProps) => position};
`

type CommonHeaderProps = {
    type: HeaderType
    position?: HeaderPosition
    onClick?: (e?: React.SyntheticEvent) => void
    isFixed?: boolean
    style?: CSSProperties
}

const CommonHeader = ({
    type,
    onClick,
    position = HEADER_POSITION.LEFT,
    isFixed = false,
    style = {},
}: CommonHeaderProps) => {
    return (
        <Container position={position} isFixed={isFixed} style={style}>
            {(() => {
                switch (type) {
                    case 'BACK':
                        return (
                            <button onClick={onClick}>
                                <IconBack width={'2.4rem'} height={'2.4rem'} />
                            </button>
                        )
                    case 'CLOSE':
                        return (
                            <button onClick={onClick}>
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
