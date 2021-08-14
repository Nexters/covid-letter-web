import {useLetterStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'

const Answer = () => {
    const router = useRouter()

    const {answer, title, addAnswer, addTitle} = useLetterStore()
    const onClickConfirm = () => {
        if (answer.length === 0 || title.length === 0) return
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW.STICKER,
            query: {optionId: router.query.optionId},
        })
    }
    return (
        <>
            <AnswerWrapper>
                <TitleInput
                    placeholder="제목은 여기에 적어!"
                    value={title}
                    onChange={(e) => addTitle(e.target.value)}
                />
                <AnswerInput
                    value={answer}
                    placeholder="질문에 대하여 편하게 대답해주시고, 그 외에 하고싶은 말을 자유롭게 적어주세요."
                    onChange={(e) => addAnswer(e.target.value)}
                />
            </AnswerWrapper>
            <ConfirmButton onClick={onClickConfirm}>확인</ConfirmButton>
        </>
    )
}

const AnswerWrapper = styled.section`
    ${tw`tw-bg-beige-200 
        tw-flex tw-flex-col`}
    width: 100%;
    height: 28.8rem;
    position: fixed;
    bottom: 5.2rem;
    padding: 3.2rem 2.4rem 1.6rem;
    letter-spacing: -0.015em;
`
const TitleInput = styled.input`
    ${tw`tw-bg-beige-200 tw-font-ohsquare-air tw-text-grey-800`}
    min-width: 19.5rem;
    height: 4.2rem;
    font-size: 1.8rem;
    line-height: 2.5rem;
`
const AnswerInput = styled.textarea`
    ${tw`tw-bg-beige-200 tw-font-nanumBarunGothic tw-text-grey-800`}
    width: inherit;
    height: inherit;
    font-size: 1.4rem;
    line-height: 2.2rem;
`

const ConfirmButton = styled.button`
    ${tw`tw-fixed tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    min-width: 36rem;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`

export default observer(Answer)
