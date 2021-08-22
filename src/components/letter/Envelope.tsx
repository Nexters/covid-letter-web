import {Letter, LetterState} from '$types/response/letter'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'
import {convertCommonDateFormat} from '$utils/date'
import styled from '@emotion/styled'
import ConfirmButton from '$components/letter/ConfirmButton'
import {FlexBetween, FlexStart} from '$styles/utils/layout'
import tw from 'twin.macro'
import {StickerFactory} from '$components/sticker/stickerFactory'
import {StampFactory} from '$components/stamp/stampFactory'

type EnvelopeProps = {
    letter: Letter
}

const letterOpenButtonText = {
    [LetterState.PENDING]: '아직 열어볼 수 없어요',
    [LetterState.SEND]: '뜯어볼래요',
    [LetterState.DISPLAYED]: '읽어볼래요',
}

const Envelope = ({letter}: EnvelopeProps) => {
    const {encryptedId, title, sticker, sendOptionId, sendOptionText, state, createdDate, email, name} = letter
    const isAvailableOpenLetter = state !== LetterState.PENDING

    const router = useRouter()
    const openLetter = () => {
        if (!isAvailableOpenLetter) {
            return
        }

        router.push({pathname: ROUTES.COVID.LETTER.DETAIL, query: {encryptedId}})
    }

    return (
        <Container>
            <TitleWrapper>
                <Highlight>{title}</Highlight>
                {StickerFactory(sticker, '2.4rem')}
            </TitleWrapper>
            <DescWrapper>
                <div>
                    <div>
                        <div><span>To. {name}</span></div>
                        <div><span className="grey">{email}</span></div>
                    </div>
                    <div className="send-option">
                        <div><span className="grey">발송 기준</span></div>
                        <div><span>{sendOptionText}</span></div>
                    </div>
                </div>
                {StampFactory(sendOptionId, '11.2rem')}
            </DescWrapper>
            <Divider />
            <SenderWrapper>
                <div className="send-date">
                    <span>작성날짜</span>
                    <span>{convertCommonDateFormat(createdDate)}</span>
                </div>
                <div>From. {name}</div>
            </SenderWrapper>

            <ConfirmButton disabled={!isAvailableOpenLetter} onClick={openLetter}>
                {letterOpenButtonText[state]}
            </ConfirmButton>
        </Container>
    )
}

const Container = styled.section`
    padding-top: 1.6rem;
    padding-bottom: 4.5rem;
    margin-bottom: 2.8rem;
`
const TitleWrapper = styled.div`
   ${FlexStart}
`

const Highlight = styled.span`
    ${tw`tw-font-normal tw-text-base`}
    line-height: 2.4rem;
    letter-spacing: -0.015em;
    margin-right: 1.2rem;

    background-image: linear-gradient(1turn, var(--beige-300), var(--beige-300) 0.8rem, transparent 0, transparent);
`

const DescWrapper = styled.div`
   ${FlexBetween}
   ${tw`tw-font-normal tw-text-sm tw-text-left`}
   margin-top: 3.4rem;
   line-height: 2.2rem;
   letter-spacing: -0.015em;

   div + div {
        margin-top: 0.4rem;
   }
   .send-option {
        margin-top: 1.6rem;
   }
   .grey {
        ${tw`tw-font-light tw-text-grey-600`}
   }
`
const Divider = styled.div`
    ${tw`tw-border-2 tw-border-solid tw-border-grey-200`}
    margin: 3.2rem 0 2.4rem 0;
`

const SenderWrapper = styled.div`
    ${tw`tw-text-sm tw-text-right`}
    line-height: 22px;
    letter-spacing: -0.015em;

    .send-date {
        ${tw`tw-font-light tw-text-grey-600`}

        span + span {
            margin-left: 1.3rem;
        }
    }

    .sender-name {
         ${tw`tw-font-normal tw-text-grey-800`}
    }
`


export default Envelope
