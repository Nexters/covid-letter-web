import {LetterOption} from '$types/response/letter'
import {withAxios} from '$utils/fetcher/withAxios'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import {ReactChild, useState} from 'react'
import {useRouter} from 'next/router'
import ROUTES from '$constants/routes'
import tw from 'twin.macro'

type ButtonPropsType = {
    children?: ReactChild
    isClicked?: boolean
}
const Container = styled.section`
    ${tw`tw-bg-beige-300 tw-flex tw-flex-col tw-justify-center`}
    max-width: 36rem;
    height: 100vh;
    margin: 0 auto;
`

const Title = styled.h3`
    ${tw`tw-font-ohsquare tw-font-bold tw-text-primary-green-500`}
    font-size: 2rem;
    line-height: 2.4rem;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    .sub-title {
        ${tw`tw-font-ohsquare-air`}
        margin-top: 0.8rem;
        font-weight: normal;
        font-size: 1.6rem;
        line-height: 1.9rem;
    }
`

const ButtonList = styled.ul`
    display: inherit;
    align-self: center;
    flex-direction: column;
    gap: 2rem;
    margin-top: 4.8rem;
`

const Button = styled.button<ButtonPropsType>([
    css`
        ${tw`tw-bg-beige-300 tw-font-ohsquare-air tw-text-grey-700`}
        min-width: 31.2rem;
        height: 5.2rem;
        border-radius: 0.4rem;
        letter-spacing: -0.015em;
        font-size: 1.6rem;
    `,
    ({isClicked}) =>
        isClicked
            ? tw`tw-bg-primary-yellow-600 
            tw-font-bold tw-font-ohsquare tw-text-primary-green-500
            tw-border-2 tw-border-primary-green-600`
            : css`
                  border: 1px solid #d4cec4; // 디자인 시스템에 이 색이 없는 관계로...
              `,
])

const ConfirmButton = styled.button`
    ${tw`tw-fixed tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    min-width: 36rem;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`

interface Props {
    options: LetterOption[]
}

const LetterOptionPage = ({options}: Props) => {
    const router = useRouter()

    const [selectedOptionId, setSelectedOptionId] = useState<number>(-1)
    const onClickOption = (option: LetterOption) => {
        if (option.id === selectedOptionId) {
            setSelectedOptionId(-1)
        } else setSelectedOptionId(option.id)
    }
    const onClickConfirm = () => {
        if (selectedOptionId === -1) return
        router.push({
            pathname: ROUTES.COVID.LETTER.NEW,
            query: {option: selectedOptionId},
        })
    }
    return (
        <Container>
            <Title>
                발송 기준 선택 📮
                <p className="sub-title">언제 발송을 원하시나요?</p>
            </Title>
            <ButtonList>
                {options.map((option, index) => (
                    <li key={option.id} onClick={() => onClickOption(option)}>
                        <Button isClicked={index === selectedOptionId}>{option.text}</Button>
                    </li>
                ))}
            </ButtonList>
            <ConfirmButton onClick={onClickConfirm}>확인</ConfirmButton>
        </Container>
    )
}

export async function getServerSideProps() {
    const res = await withAxios<LetterOption[]>({
        url: '/letters/options',
        method: 'GET',
    })

    const options = res.map((option) => ({
        ...option,
    }))

    return {props: {options}}
}
export default LetterOptionPage
