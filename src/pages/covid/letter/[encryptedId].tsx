import {GetServerSideProps} from 'next'
import {withAxios} from '$utils/fetcher/withAxios'
import {Letter, LetterState} from '$types/response/letter'
import {convertCommonDateFormat} from '$utils/date'
import {useRouter} from 'next/router'
import ROUTES from '$constants/routes'
import {useProfileContext} from '$contexts/ProfileContext'
import HalfLayer from '$components/layer/HalfLayer'
import {useState} from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import Divider from '$components/letter/Divider'
import {css} from '@emotion/react'
import ServicePromotion from '$components/letter/ServicePromotion'
import ConfirmButton from '$components/letter/ConfirmButton'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'
import CommonHeader from '$components/header/CommonHeader'

const LetterDetail = ({letter}: {letter: Letter}) => {
    const router = useRouter()
    const {profile} = useProfileContext()
    const [isShowServicePromotion, setIsShowServicePromotion] = useState<boolean>(false)

    const {title, contents, createdDate} = letter
    const questionText = letter.questionText ?? (
        <>
            질문없이 자유롭게 적은
            <br />
            나의 이야기
        </>
    )
    const finishReadLetter = () => {
        if (profile?.id) {
            router.push(ROUTES.COVID.LETTER.LIST)
            return
        }

        setIsShowServicePromotion(true)
    }
    const handleHeader = () => {
        router.push({
            pathname: ROUTES.COVID.MAIN,
        })
    }

    return (
        <>
            <CommonHeader type={HEADER_TYPE.BACK} position={HEADER_POSITION.LEFT} onClick={handleHeader} />
            <Container>
                <TitleWrap>
                    <span className="title-text">{title}</span>
                    <div className="send-date">
                        <span>작성날짜</span>
                        <span className="vertical-divider"></span>
                        <span>{convertCommonDateFormat(createdDate)}</span>
                    </div>
                </TitleWrap>

                <Divider css={dividerCss} />
                <ContentsWrap>
                    <div>
                        {contents.split('\n').map((text, index) => (
                            <span key={`${index}-${text}`}>
                                {text}
                                <br />
                            </span>
                        ))}
                    </div>
                </ContentsWrap>
                <Divider css={dividerCss} />

                <QuestionWrap>
                    <div>
                        <span className="description">당시 받았던 질문</span>
                    </div>
                    <div>
                        <span className="question-text">{questionText}</span>
                    </div>
                </QuestionWrap>
            </Container>
            <EndReadButton onClick={finishReadLetter}>다 읽었어요!</EndReadButton>

            <HalfLayer
                isShow={isShowServicePromotion}
                closeFn={() => setIsShowServicePromotion(false)}
                bgColor={'var(--beige-200)'}>
                <ServicePromotion />
            </HalfLayer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {encryptedId} = context.query
    const letter = await withAxios<Letter>({
        url: `/letters/${encryptedId}`,
        method: 'GET',
    })

    if (letter.state === LetterState.SEND) {
        withAxios<Letter>({
            //읽음처리는 호출결과 기다릴 필요없음
            url: `/letters/${encryptedId}/state`,
            method: 'PUT',
        })
    }

    return {
        props: {
            letter,
        },
    }
}

const Container = styled.div`
    ${tw`tw-bg-beige-200`}
    min-height: 100vh;
    padding: 5.6rem 0 5.2rem 0;
`

const TitleWrap = styled.section`
    padding: 2.4rem;

    .title-text {
        ${tw`tw-text-lg`}
        letter-spacing: -0.015em;
    }

    .send-date {
        ${tw`tw-text-grey-600 tw-font-light tw-text-sm`}
        letter-spacing: -0.015em;

        .vertical-divider {
            ${tw`tw-hue-rotate-90 tw-border-grey-600`}
            margin: 0 1.2rem;
            border: 1px solid;
        }
    }
`

const ContentsWrap = styled.section`
    ${tw`tw-bg-beige-300 tw-text-sm tw-font-light tw-text-grey-800`}
    min-height: 35.6rem;
    padding: 2.4rem;
    letter-spacing: -0.015em;
`

const QuestionWrap = styled.section`
    padding: 2.4rem 3.2rem;
    .description {
        ${tw`tw-font-light tw-text-xs tw-text-grey-600`}
        letter-spacing: -0.015em;
    }

    .question-text {
        ${tw`tw-text-sm tw-text-grey-700`}
        letter-spacing: -0.015em;
    }

    div + div {
        margin-top: 0.8rem;
    }
`

const EndReadButton = styled(ConfirmButton)``

const dividerCss = css`
    margin: 0 2.4rem;
`

export default LetterDetail
