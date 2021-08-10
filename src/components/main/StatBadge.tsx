import styled from '@emotion/styled'
import IconArrowDown from 'assets/IconArrowDown'
import IconArrowUp from 'assets/IconArrowUp'
import tw from 'twin.macro'

const Value = styled.div`
    ${tw`tw-text-primary-green-500 tw-font-ohsquare tw-font-bold tw-text-base`}
    padding-top: .4rem;
`

type RateColorType = 'red' | 'blue' | 'green'

const StatRate = styled.div`
    ${tw`tw-flex tw-flex-1 tw-justify-center tw-items-center tw-text-xs tw-text-center tw-font-nanumBarunGothic`}
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
        margin-top: 0.3rem;
    }
`

type StatBadgeProps = {
    value: string
    change: string
    type: RateColorType
    isIncrease: boolean
}

const StatBadge = ({value, change, type, isIncrease}: StatBadgeProps) => {
    return (
        <Value>
            {value}
            <StatRate type={type}>
                <span>{change}</span>
                {isIncrease ? (
                    <IconArrowUp style={{marginLeft: '.4rem'}} color={`var(--${type}-500)`} />
                ) : (
                    <IconArrowDown style={{marginLeft: '.4rem'}} color={`var(--${type}-500)`} />
                )}
            </StatRate>
        </Value>
    )
}

export default StatBadge
