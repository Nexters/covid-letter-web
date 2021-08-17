import styled from '@emotion/styled'
import tw from 'twin.macro'
import {StickerType} from '$types/response/letter'
import {observer} from 'mobx-react-lite'
import {useLetterStore} from '$contexts/StoreContext'

interface sticker {
    type: StickerType
    label: string
    desc: string
    icon?: string
}
const stickerList: sticker[] = [
    {
        type: 'HAPPY',
        label: '행복해',
        desc: '힘겨운 시기에도 행복을 찾는 대견한 나!\n미래의 나에게도 행복 에너지를 전달해볼까?',
    },
    {
        type: 'EXPECT',
        label: '기대돼',
        desc: '미래에 기대되는 일이 있구나!\n두근거리는 마음을 담아 보내볼까?',
    },
    {
        type: 'SHY',
        label: '쑥쓰//',
        desc: '오늘 혹시 핑크빛..?\n오늘의 핑크빛 마음을 미래의 나도 느끼면 좋겠어!',
    },
    {
        type: 'LOVE',
        label: '사랑해',
        desc: '세상에서 날 가장 사랑하는 나!\n미래에 어려운 일이 생겨도 날 계속 사랑해주면 좋겠어!',
    },
    {
        type: 'UNHAPPY',
        label: '속상',
        desc: '누가 널 속상하게 했어! 누구야 데리고와!\n나중에 보면 별거 아닐거야',
    },
    {
        type: 'SAD',
        label: '슬퍼...',
        desc: '혹시 울진 않았지?\n오늘 슬픈 일을 훌훌 털어버리고 내일은 웃자!',
    },
    {
        type: 'SHOCK',
        label: '쇼킹해!',
        desc: '대박! 그런 일이 있었어?\n이건 내 인생에 역사같은 일이야!',
    },
    {
        type: 'BLUE',
        label: '우울',
        desc: '마음이 많이 가라앉아있구나.\n난 언제나 네 곁에 있어.',
    },
    {
        type: 'SHAME',
        label: '흑역사',
        desc: '이건 내 인생의 이불킥감...\n이렇게 된 김에 미래의 술안주로 써먹어봐!',
    },
    {
        type: 'FIGHTING',
        label: '힘내!!',
        desc: '너무 힘들 때는 잠시 쉬어가도 괜찮아.\n숨 고르고 다시 걸어가보자!',
    },
    {
        type: 'OK',
        label: '괜찮아',
        desc: '원래 인생은 한치 앞도 모르는거잖아.\n지금은 흔들려도 괜찮아.',
    },
    {
        type: 'GOOD',
        label: '칭찬해',
        desc: '그동안 얼마나 열심히 노력했겠어!\n진짜 고생많았어! 너무 멋있어!',
    },
]

const StickerList = () => {
    const {chooseSticker} = useLetterStore()
    return (
        <StickerListWrapper>
            {stickerList.map((item) => (
                <StickerItemWrapper key={item.type}>
                    <StickerWrapper onClick={() => chooseSticker(item)}>{item.type}</StickerWrapper>
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
    tw-border-2 tw-border-grey-300 tw-rounded-full`}
    width: 6rem;
    height: 6rem;
    box-sizing: border-box;
    text-align: center;
    line-height: 8rem;
    margin-bottom: 0.6rem;
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
