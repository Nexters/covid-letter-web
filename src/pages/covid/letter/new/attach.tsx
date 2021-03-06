import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/router'
import {withAxios} from '$utils/fetcher/withAxios'
import {useProfileContext} from '$contexts/ProfileContext'
import {useLetterStore} from '$contexts/StoreContext'
import {Letter} from '$types/response/letter'
import ROUTES from '$constants/routes'
import {NO_OPTION_ID} from '$constants'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'
import StickerList from '$components/sticker'
import CommonHeader from '$components/header/CommonHeader'
import EnvelopeLoading from '$components/loading/EnvelopeLoading'
import IconQuestion from '$assets/icons/IconQuestion'
import {StickerFactory} from '$components/sticker/stickerFactory'
import {MainButton} from '$styles/utils/components'

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
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW.MAIN,
            query: {optionId: router.query.optionId},
        })
    }
    return (
        <>
            <CommonHeader type={HEADER_TYPE.BACK} position={HEADER_POSITION.LEFT} onClick={handleHeader} />
            <Header>
                <h3>?????? ????????? ?????? ????</h3>
                <h4>???????????? ???????????? ????????????!</h4>
            </Header>
            <StickerDescription>
                <Sticker>
                    {sticker.type ? (
                        <span className="sticker">{StickerFactory(sticker.type, '6.8rem')}</span>
                    ) : (
                        <span className="question-mark">
                            <IconQuestion />
                        </span>
                    )}
                </Sticker>
                {sticker.label ? (
                    <span className="sticker-name highlight">{sticker.label}</span>
                ) : (
                    <span className="sticker-name">?????? ??????...</span>
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
                        ????????? ????????? <br /> ?????? ????????? ???????????? ???????
                    </span>
                )}
            </StickerDescription>
            <StickerList />
            <ConfirmButton onClick={confirm} disabled={sticker.type === undefined}>
                ??????
            </ConfirmButton>
            <EnvelopeLoading
                isShow={isShowEnvelopeOpenLoading}
                text={'?????? ?????? ???'}
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
        &.highlight {
            ${tw`tw-text-grey-800`}
            background-image: linear-gradient(1turn, #E7BF78, #E7BF78 8px, transparent 0, transparent);
        }
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
    .question-mark {
        align-self: center;
    }
`

const ConfirmButton = styled(MainButton)`
    ${tw`tw-fixed tw-bottom-0`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    z-index: 2;
`
export default observer(Attach)
