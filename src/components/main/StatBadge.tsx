import {FontNanumBarunGothic, FontOhsquare} from '$styles/utils/font'
import {FlexCenter} from '$styles/utils/layout'
import styled from '@emotion/styled'
import IconArrowDown from 'assets/icons/IconArrowDown'
import IconArrowUp from 'assets/icons/IconArrowUp'
import tw from 'twin.macro'

const ZERO = '0'
const ZERO_PERCENT = '0%'

const Value = styled.div`
    ${FontOhsquare}
    ${tw`tw-text-primary-green-500 tw-text-base`}
    padding-top: .4rem;
`

type RateColorType = 'red' | 'blue' | 'green'

const StatRate = styled.div`
    ${FlexCenter}
    ${FontNanumBarunGothic('normal')}
    ${tw`tw-text-xs tw-text-center`}
    border-radius: 100rem;
    margin-top: 1rem;
    padding: 0.2rem 0.8rem;
    background-color: ${({type}: {type: RateColorType}) => {
        switch (type) {
            case 'blue':
                return `rgba(105, 147, 255, 0.2)`
            case 'red':
                return `rgba(255, 100, 99, 0.2)`
            case 'green':
                return `rgba(75, 204, 174, 0.2)`
            default:
                return 'var(--grey-000)'
        }
    }};
    color: ${({type}: {type: RateColorType}) => `var(--${type}-500)`};

    span {
        ${tw`tw-font-semibold`}
        margin-top: 0.2rem;
    }
`

type StatBadgeProps = {
    value: string
    change: string
    type: RateColorType
    isIncrease: boolean
}

const StatBadge = ({value, change, type, isIncrease}: StatBadgeProps) => {
    const arrow = isIncrease ? (
        <IconArrowUp style={{marginLeft: '.4rem'}} color={`var(--${type}-500)`} />
    ) : (
        <IconArrowDown style={{marginLeft: '.4rem'}} color={`var(--${type}-500)`} />
    )

    const isZero = change === ZERO || change === ZERO_PERCENT
    return (
        <Value>
            {value}
            <StatRate type={type}>
                <span>{isZero ? '-' : change}</span>
                {isZero || arrow}
            </StatRate>
        </Value>
    )
}

export default StatBadge
