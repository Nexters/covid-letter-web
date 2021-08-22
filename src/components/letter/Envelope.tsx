import {Letter, LetterState} from '$types/response/letter'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'
import {useAlertStore} from '$contexts/StoreContext'
import {convertCommonDateFormat} from '$utils/date'
import styled from '@emotion/styled'
import ConfirmButton from '$components/letter/ConfirmButton'

type EnvelopeProps = {
    letter: Letter
}

const letterOpenButtonText = {
    [LetterState.PENDING]: '아직 열어볼 수 없어요',
    [LetterState.SEND]: '뜯어볼래요',
    [LetterState.DISPLAYED]: '읽어볼래요',
}

const Envelope = ({letter}: EnvelopeProps) => {
    const {encryptedId, title, sticker, sendOptionText, state, createdDate, email, name} = letter
    const isAvailableOpenLetter = state !== LetterState.PENDING

    const router = useRouter()
    const {alert} = useAlertStore()
    const openLetter = () => {
        if (!isAvailableOpenLetter) {
            alert({
                title: '[TEXT 수정필요] 아직 편지를 열어 볼 수 없어요',
            })
            return
        }

        router.push({pathname: ROUTES.COVID.LETTER.DETAIL, query: {encryptedId}})
    }

    return (
        <Container>
            <div>{encryptedId}</div>
            <div>제목: {title}</div>
            <div>작성일: {convertCommonDateFormat(createdDate)}</div>
            <div>발송기준: {sendOptionText}</div>
            <div>이름: {name}</div>
            <div>email: {email}</div>
            <div>전송상태: {state} - UI 적용</div>
            <div>스티커: {sticker} - UI 적용</div>
            <ConfirmButton disabled={!isAvailableOpenLetter} onClick={openLetter}>
                {letterOpenButtonText[state]}
            </ConfirmButton>
        </Container>
    )
}

const Container = styled.section`
    padding: 1.6rem 0 5.2rem 0;
`


export default Envelope
