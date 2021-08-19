import styled from '@emotion/styled'
import tw from 'twin.macro'
import {observer} from 'mobx-react-lite'
import {useLetterStore} from '$contexts/StoreContext'
import {stickerList} from '$constants'
import {StickerFactory} from '$components/sticker/stickerFactory'

const StickerList = () => {
    const {sticker, chooseSticker} = useLetterStore()
    return (
        <StickerListWrapper>
            {stickerList.map((item) => (
                <StickerItemWrapper key={item.type}>
                    <StickerWrapper onClick={() => chooseSticker(item)}>
                        {sticker.type === item.type ? (
                            <span></span>
                        ) : (
                            <span className="sticker">{StickerFactory(item.type)}</span>
                        )}
                    </StickerWrapper>
                    <SpeechBubble>{item.label}</SpeechBubble>
                </StickerItemWrapper>
            ))}
        </StickerListWrapper>
    )
}

const StickerListWrapper = styled.section`
    ${tw`tw-grid`}
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    justify-items: center;
    row-gap: 3rem;
    column-gap: 2.4rem;
    padding: 0 2.8rem 5.6rem;
`

const StickerItemWrapper = styled.article`
    display: flex;
    flex-direction: column;
`

const StickerWrapper = styled.div`
    ${tw`tw-bg-grey-000 
    tw-flex tw-justify-center  
    tw-border-2 tw-border-grey-300 tw-rounded-full`}
    width: 6rem;
    height: 6rem;
    box-sizing: border-box;
    text-align: center;
    line-height: 8rem;
    margin-bottom: 0.6rem;
    .sticker {
        margin-top: 3%;
    }
`

const SpeechBubble = styled.div`
    ${tw`tw-bg-grey-000 tw-relative
    tw-font-ohsquare-air tw-text-grey-800 tw-text-center`}
    position: relative;
    min-width: 5.6rem;
    height: 3.5rem;
    padding-top: 20%;
    -webkit-border-radius: 5.4rem;
    -moz-border-radius: 5.4rem;
    border-radius: 5.4rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
    &:after {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 0 0.8rem 1rem;
        border-color: #ffffff transparent;
        display: block;
        width: 0;
        z-index: 1;
        margin-left: -28%;
        top: -0.5rem;
        left: 40%;
    }
`

export default observer(StickerList)
