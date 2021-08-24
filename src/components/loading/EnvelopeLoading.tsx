import styled from '@emotion/styled'
import tw from 'twin.macro'
import LetterEnvelopeImageImage from '$assets/images/LetterEnvelopeImage'
import {FlexCenter} from '$styles/utils/layout'
import {FontOhsquareAir} from '$styles/utils/font'
import {useEffect} from 'react'

const DEFAULT_DELAY = 2000

type EnvelopeLoadingProps = {
    isShow: boolean
    text: string
    delay?: number
    afterLoadingFn: () => void
}

const EnvelopeLoading = ({isShow, text, delay = DEFAULT_DELAY, afterLoadingFn}: EnvelopeLoadingProps) => {
    useEffect(() => {
        if (isShow) {
            window.setTimeout(afterLoadingFn, delay)
        }
    })

    return (
        <>
            {isShow && <Layer>
                <Container>
                    <div>
                        <div className="letter-envelope-image">
                            <LetterEnvelopeImageImage />
                        </div>
                        <LoadingTextWrapper>{text}</LoadingTextWrapper>
                    </div>
                </Container>
            </Layer>}
        </>
    )
}

const Layer = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2020;
`

const Container = styled.div`
    ${FlexCenter}
    ${tw`tw-bg-beige-300`}
    max-width: 420px;
    margin: 0 auto;
    min-height: 100vh;
    position: relative;
    
    .letter-envelope-image {
        ${FlexCenter}
    }
`

const LoadingTextWrapper = styled.div`
    ${FontOhsquareAir}
    ${tw`tw-text-base tw-text-center tw-text-primary-green-400`}
    letter-spacing: -0.015em;
    margin-top: 1.6rem;
`

export default EnvelopeLoading
