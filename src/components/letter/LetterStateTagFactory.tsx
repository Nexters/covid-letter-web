import {LetterState} from '$types/response/letter'
import styled from '@emotion/styled'
import SvgLetterStatePending from '../../assets/tag/letter/Pending'
import SvgLetterStateSend from '../../assets/tag/letter/Send'

const Container = styled.div`
    margin-left: 0.8rem;
`

export const LetterStateTagFactory = (letterState: LetterState) => {
    switch (letterState) {
        case LetterState.PENDING:
            return <Container><SvgLetterStatePending /></Container>
        case LetterState.SEND:
            return <Container><SvgLetterStateSend /></Container>
        case LetterState.DISPLAYED:
            return <></>
    }
}
