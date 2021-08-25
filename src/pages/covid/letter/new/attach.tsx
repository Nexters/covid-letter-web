import styled from '@emotion/styled'
import tw from 'twin.macro'
import StickerList from '$components/sticker'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'
import {useLetterStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'
import {StickerFactory} from '$components/sticker/stickerFactory'
import {withAxios} from '$utils/fetcher/withAxios'
import {Letter} from '$types/response/letter'
import {useProfileContext} from '$contexts/ProfileContext'
import {useEffect, useState} from 'react'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'
import CommonHeader from '$components/header/CommonHeader'
import EnvelopeLoading from '$components/loading/EnvelopeLoading'
import {NO_OPTION_ID} from '$constants'

type Props = {
    isMobile: boolean
    token: string
    isGoogleLogin: boolean
}

const Attach = (props: Props) => {
    const router = useRouter()
    const {sticker, answer, title, questionId, optionId} = useLetterStore()
    const [isShowEnvelopeOpenLoading, setIsShowEnvelopeOpenLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!optionId) {
            router.push({pathname: ROUTES.COVID.LETTER.OPTION})
        }
    }, [])
    const {profile, addLettersCount} = useProfileContext()

    const goFinish = () => {
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW.FINISH,
            query: {optionId: router.query.optionId},
        })
    }

    const saveLetter = async () => {
        return await withAxios<Letter>({
            url: '/letters',
            method: 'POST',
            data: {
                contents: answer,
                questionId: questionId,
                sendOptionId: optionId === NO_OPTION_ID ? null : optionId,
                sticker: sticker.type,
                title: title,
            },
            headers: {
                Authorization: props.token,
            },
        })
    }
    const confirm = async () => {
        if (!sticker.type) return
        try {
            setIsShowEnvelopeOpenLoading(true)
            const response = await saveLetter()
            if (response) {
                if (profile) addLettersCount(profile)
            }
        } catch (e) {
            console.error(e)
            throw new Error(e)
        }
    }

    const handleHeader = () => {
        router.push(ROUTES.COVID.LETTER.NEW.MAIN)
    }
    return (
        <>
            <CommonHeader type={HEADER_TYPE.BACK} position={HEADER_POSITION.LEFT} onClick={handleHeader} />
            <Header>
                <h3>편지 스티커 선택 💌</h3>
                <h4>스티커로 메세지를 전달해봐!</h4>
            </Header>
            <StickerDescription>
                <Sticker>
                    {sticker.type ? (
                        <span className="sticker">{StickerFactory(sticker.type, '6.8rem')}</span>
                    ) : (
                        <span className="question-mark">?</span>
                    )}
                </Sticker>
                {sticker.label ? (
                    <span className="sticker-name">{sticker.label}</span>
                ) : (
                    <span className="sticker-name">지금 나는...</span>
                )}
                {sticker.desc ? (
                    <span className="sticker-desc">
                        {sticker.desc.split('\n').map((text) => (
                            <span key={text}>
                                {text}
                                <br />
                            </span>
                        ))}
                    </span>
                ) : (
                    <span className="sticker-desc">
                        미래의 나에게 <br /> 어떤 감정을 전달하고 싶어?
                    </span>
                )}
            </StickerDescription>
            <StickerList />
            <ConfirmButton onClick={confirm}>확인</ConfirmButton>
            <EnvelopeLoading
                isShow={isShowEnvelopeOpenLoading}
                text={'편지 뜯는 중...'}
                delay={2000}
                afterLoadingFn={goFinish}
            />
        </>
    )
}

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
    ${tw`tw-bg-grey-000 
        tw-flex tw-justify-center
    tw-border-2 tw-border-grey-300 tw-rounded-full`}
    width: 8rem;
    height: 8rem;
    box-sizing: border-box;
    text-align: center;
    line-height: 8rem;
    .sticker {
        margin-top: 5%;
    }
`

const ConfirmButton = styled.button`
    ${tw`tw-fixed tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
    z-index: 2;
    bottom: 0;
`
export default observer(Attach)
