import styled from '@emotion/styled'
import tw from 'twin.macro'

const StickerList = () => {
    return (
        <StickerListWrapper>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
            <Sticker>test1</Sticker>
        </StickerListWrapper>
    )
}

const StickerListWrapper = styled.section`
    ${tw`tw-grid`}
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    row-gap: 3rem;
    column-gap: 3.2rem;
    padding-left: 2.8rem;
    padding-right: 2.8rem;
`

const Sticker = styled.div`
    ${tw`tw-bg-grey-000 tw-border-2 tw-border-grey-300 tw-rounded-full`}
    width: 5.2rem;
    height: 5.2rem;
    box-sizing: border-box;
    text-align: center;
    line-height: 8rem;
`

export default StickerList
