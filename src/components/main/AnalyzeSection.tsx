import React, {ReactNode} from 'react'
import tw, {styled} from 'twin.macro'

const Section = styled.div`
    ${tw`tw-bg-beige-200`}
    border-radius: .4rem;
    padding: ${({infoLength}: {infoLength: number}) => (infoLength > 2 ? '2.4rem' : '2.4rem 5.8rem')};
`

const Title = styled.div`
    ${tw`tw-flex tw-text-center tw-flex-1 tw-justify-center tw-items-center tw-font-ohsquare-air tw-font-light tw-text-base tw-text-grey-800`}
`

const TitleSpan = styled.span`
    background-image: linear-gradient(1turn, #ded9c6, #ded9c6 8px, transparent 0, transparent);
`

const ContentContainer = styled.div`
    ${tw`tw-flex tw-text-center tw-flex-1 tw-justify-between tw-items-start`}
    padding-top: 2.4rem;
`

const Content = styled.div`
    .title {
        ${tw`tw-text-grey-700 tw-text-sm tw-font-nanumBarunGothic`}
    }
`

type AnalyzeData<T> = {
    title: string
    value: T
}

interface AnalyzeSectionProps<T> {
    title: string
    info: AnalyzeData<T>[]
    style?: React.CSSProperties
}

const AnalyzeSection = ({title, info, style}: AnalyzeSectionProps<string | ReactNode>) => {
    return (
        <Section style={style} infoLength={info.length}>
            <Title>
                <TitleSpan>{title}</TitleSpan>
            </Title>
            <ContentContainer>
                {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                {info.map(({title, value}, key) => (
                    <Content key={key}>
                        <div className="title">{title}</div>
                        <div className="value">{value}</div>
                    </Content>
                ))}
            </ContentContainer>
        </Section>
    )
}

export default AnalyzeSection
