import Back from '$components/appbar/Back'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import StickerList from '$components/sticker'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'

const Attach = () => {
    const router = useRouter()
    const onClickConfirm = () => {
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW.FINISH,
            query: {optionId: router.query.optionId},
        })
    }
    return (
        <>
            <Back />
            <Container>
                <Header>
                    <h3>편지 스티커 선택 💌</h3>
                    <h4>스티커로 메세지를 전달해봐!</h4>
                </Header>
                <StickerDescription>
                    <Sticker>
                        <span className="question-mark">?</span>
                    </Sticker>
                    <span className="sticker-name">지금 나는...</span>
                    <span className="sticker-desc">
                        미래의 나에게 <br /> 어떤 감정을 전달하고 싶어?
                    </span>
                </StickerDescription>
                <StickerList />
                <ConfirmButton onClick={onClickConfirm}>확인</ConfirmButton>
            </Container>
        </>
    )
}

const Container = styled.div`
    ${tw`tw-bg-beige-300 tw-flex tw-flex-col`}
    //max-width: 36rem;
    height: 100%;
    margin: 0 auto;
    padding-top: 5.6rem;
    padding-bottom: 5.6rem;
`

const Header = styled.section`
    margin: 3.2rem 0 5.6rem 2.4rem;
    h3 {
        ${tw`tw-font-bold tw-font-ohsquare tw-text-primary-green-500`}
        font-size: 2rem;
        line-height: 2.4rem;
    }
    h4 {
        ${tw`tw-font-ohsquare-air tw-text-primary-green-500`}
        font-weight: 300;
        font-size: 1.6rem;
        line-height: 1.9rem;
        margin-top: 0.8rem;
    }
`

const StickerDescription = styled.section`
    ${tw`tw-flex tw-flex-col`}
    align-items: center;
    margin-bottom: 6rem;
    .sticker-name {
        ${tw`tw-text-grey-500 tw-font-ohsquare tw-font-bold`}
        font-weight: bold;
        font-size: 1.8rem;
        line-height: 2.5rem;
        margin-top: 1.6rem;
        margin-bottom: 1.2rem;
    }
    .sticker-desc {
        ${tw`tw-text-grey-700 tw-font-nanumBarunGothic tw-text-center`}
        font-size: 1.4rem;
        line-height: 2.2rem;
        font-weight: 300;
    }
`

const Sticker = styled.div`
    ${tw`tw-bg-grey-000 tw-border-2 tw-border-grey-300 tw-rounded-full`}
    width: 8rem;
    height: 8rem;
    box-sizing: border-box;
    text-align: center;
    line-height: 8rem;
`

const ConfirmButton = styled.button`
    ${tw`tw-fixed tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
    z-index: 2;
`
export default Attach
