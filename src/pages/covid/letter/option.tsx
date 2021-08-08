import {LetterOption} from '$types/response/letter'
import {withAxios} from '$utils/fetcher/withAxios'
import styled from '@emotion/styled'
import {css, jsx} from '@emotion/react'
import tw from 'twin.macro'
import {useState} from 'react'
import {useRouter} from 'next/router'
import ROUTES from '$constants/routes'

const Container = styled.section`
    // tw\`tw-bg-beige-300\`,
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 360px;
    height: 100vh;
    margin: 0 auto;
    background: #eae6d7;
`

const Title = styled.h3`
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    padding-left: 24px;
    padding-right: 24px;
    .sub-title {
        margin-top: 8px;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
    }
`

const ButtonList = styled.ul`
    display: inherit;
    align-self: center;
    flex-direction: column;
    gap: 20px;
    margin-top: 48px;
`

const Button = styled.button([
    // tw`tw-bg-yellow-600`,
    css`
        min-width: 312px;
        height: 52px;
        border-radius: 4px;
    `,
    ({isClicked}) =>
        isClicked
            ? css`
                  background: #d1a65a;
                  border: 2px solid #11373e; //tw-border
                  font-weight: bold;
              `
            : css`
                  background: #eae6d7;
                  border: 1px solid #d4cec4;
              `,
])

const ConfirmButton = styled.button`
    position: fixed;
    min-width: 360px;
    height: 52px;
    background: #11373e;
    bottom: 0;
    color: white;
    font-size: 16px;
    font-weight: bold;
    line-height: 25px;
`

interface Props {
    options: LetterOption[]
}

const LetterOptionPage = ({options}: Props, {isMobile}: {isMobile: boolean}) => {
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

export async function getStaticProps() {
    const res = await withAxios<LetterOption[]>({
        url: '/letter/option',
        method: 'GET',
    })

    const options = res.map((option) => ({
        ...option,
    }))

    return {props: {options}}
}
export default LetterOptionPage
