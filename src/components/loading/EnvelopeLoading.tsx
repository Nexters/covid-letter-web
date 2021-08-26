import styled from '@emotion/styled'
import tw from 'twin.macro'
import LetterEnvelopeImageImage from '$assets/images/LetterEnvelopeImage'
import {FlexCenter} from '$styles/utils/layout'
import {FontOhsquareAir} from '$styles/utils/font'
import {useCallback, useEffect} from 'react'
import {animated, useSpring} from 'react-spring'

const DEFAULT_DELAY = 2000

type EnvelopeLoadingProps = {
    isShow: boolean
    text: string
    delay?: number
    afterLoadingFn: () => void
}

const EnvelopeLoadingImage = () => {
    const styles = useSpring({
        loop: true,
        to: useCallback(async (next) => {
            await next({transform: 'translateY(-8px)'})
            await next({transform: 'translateY(8px)'})
        }, []),
        from: {transform: 'translateY(8px)'},
        config: {
            tension: 150,
        },
    })
    return (
        <animated.div style={styles}>
            <LetterEnvelopeImageImage />
        </animated.div>
    )
}

const EnvelopeLoading = ({isShow, text, delay = DEFAULT_DELAY, afterLoadingFn}: EnvelopeLoadingProps) => {
    useEffect(() => {
        if (isShow) {
            window.setTimeout(afterLoadingFn, delay)
        }
    })

    return (
        <>
            {isShow && (
                <Layer>
                    <Container>
                        <div>
                            <div className="letter-envelope-image">
                                <EnvelopeLoadingImage />
                            </div>
                            <LoadingTextWrapper>
                                {text}
                                <div className="loading">
                                    <span>.</span>
                                    <span>.</span>
                                    <span>.</span>
                                </div>
                            </LoadingTextWrapper>
                        </div>
                    </Container>
                </Layer>
            )}
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
    ${tw`tw-inline-flex tw-text-base tw-text-center tw-text-primary-green-400`}
    letter-spacing: -0.015em;
    margin-top: 2rem;

    .loading {
        margin-top: -0.2rem;
        margin-left: 0.2rem;
        span {
            display: inline-block;
            animation: loading 0.8s infinite;
            margin-left: 0.1rem;
        }
        span:nth-of-type(2) {
            animation-delay: 0.1s;
        }
        span:nth-of-type(3) {
            animation-delay: 0.2s;
        }
    }
    @keyframes loading {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.8);
        }
    }
`

export default EnvelopeLoading
