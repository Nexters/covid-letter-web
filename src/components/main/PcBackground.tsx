import MainBgLeftDownImage from '$assets/images/MainBgLeftDownImage'
import MainBgRightDownImage from '$assets/images/MainBgRightDownImage'
import MainBgRightUpImage from '$assets/images/MainBgRightUpImage'
import Logo from '$assets/logos/Logo'
import PostCardColPattern from '$assets/patterns/PostCardColPattern'
import ROUTES from '$constants/routes'
import {FontOhsquare} from '$styles/utils/font'
import styled from '@emotion/styled'
import {useRouter} from 'next/router'
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

const LeftUpWrapper = styled.div`
    ${tw`tw-text-center`}
    position: fixed;
    top: 6%;
    left: 3.8%;

    div {
        user-select: none;
        ${FontOhsquare}
        ${tw`tw-text-lg tw-text-primary-green-400`}
        margin-top: 1.2rem;
    }

    &:hover {
        cursor: pointer;
    }
`

const RightUpWrapper = styled.div`
    position: fixed;
    top: 6%;
    right: 4.5%;
`

const LeftDownWrapper = styled.div`
    position: fixed;
    bottom: 6%;
    left: 3.8%;
`

const RightDownWrapper = styled.div`
    position: fixed;
    bottom: 6%;
    right: 3.8%;
`

const PcBackground = () => {
    const patternColRef = useRef<SVGSVGElement>(null)
    const [numOfNeededPatterns, setNumOfNeededPatterns] = useState(0)

    useEffect(() => {
        const patternHeight = patternColRef.current?.clientHeight

        if (patternHeight) {
            const numOfColPatterns = Math.ceil(window.innerHeight / patternHeight)
            setNumOfNeededPatterns(numOfColPatterns - 1)
        }
    }, [])

    const columnLength = new Array(numOfNeededPatterns).fill(0)
    const router = useRouter()

    const goMain = () => router.push(ROUTES.COVID.MAIN)
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
            <LeftUpWrapper onClick={goMain}>
                <Logo />
                <div>안녕, 나야</div>
            </LeftUpWrapper>
            <RightUpWrapper>
                <MainBgRightUpImage />
            </RightUpWrapper>
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
