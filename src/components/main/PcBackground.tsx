import MainBgLeftDownImage from '$assets/images/MainBgLeftDownImage'
import MainBgRightDownImage from '$assets/images/MainBgRightDownImage'
import PostCardColPattern from '$assets/patterns/PostCardColPattern'
import styled from '@emotion/styled'
import {useEffect, useRef, useState} from 'react'
import tw from 'twin.macro'

const DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
} as const

type Direction = typeof DIRECTION[keyof typeof DIRECTION]

const BackgroundBorder = styled.div`
    position: fixed;
    ${({direction}: {direction: Direction}) => {
        switch (direction) {
            case DIRECTION.LEFT:
                return `
                left: 0;
                top: 0;
                bottom: 0;
                `
            case DIRECTION.RIGHT:
                return `
                right: 0;
                top: 0;
                bottom: 0;
                `
            case DIRECTION.TOP:
                return `
                top: 0;
                left: 0;
                right: 0;
                `
            case DIRECTION.BOTTOM:
                return `
                bottom: 0;
                left: 0;
                right: 0;
                `
            default:
                return ``
        }
    }};
`

const ColumnWrapper = styled.div`
    ${tw`tw-flex tw-flex-col tw-justify-start`}
`

const LeftDownWrapper = styled.div`
    position: fixed;
    bottom: 4%;
    left: 2.8%;
`

const RightDownWrapper = styled.div`
    position: fixed;
    bottom: 4%;
    right: 2.8%;
`

const PcBackground = () => {
    const patternColRef = useRef<SVGSVGElement>(null)
    const [numOfNeededPatterns, setNumOfNeededPatterns] = useState(0)

    useEffect(() => {
        const patternHeight = patternColRef.current?.clientHeight

        if (patternHeight) {
            const numOfColPatterns = Math.ceil(document.body.clientHeight / patternHeight)
            setNumOfNeededPatterns(numOfColPatterns - 1)
        }
    }, [])

    const columnLength = new Array(numOfNeededPatterns).fill(0)
    return (
        <>
            <BackgroundBorder direction={DIRECTION.LEFT}>
                <PostCardColPattern ref={patternColRef} />
                <ColumnWrapper>
                    {columnLength.map((_, index) => (
                        <PostCardColPattern key={index} />
                    ))}
                </ColumnWrapper>
            </BackgroundBorder>
            <BackgroundBorder direction={DIRECTION.RIGHT}>
                <PostCardColPattern />
                <ColumnWrapper>
                    {columnLength.map((_, index) => (
                        <PostCardColPattern key={index} />
                    ))}
                </ColumnWrapper>
            </BackgroundBorder>
            <LeftDownWrapper>
                <MainBgLeftDownImage />
            </LeftDownWrapper>
            <RightDownWrapper>
                <MainBgRightDownImage />
            </RightDownWrapper>
        </>
    )
}

export default PcBackground
