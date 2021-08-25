import styled from '@emotion/styled'
import {css} from '@emotion/react'
import {ReactChild, useState} from 'react'
import {useRouter} from 'next/router'
import ROUTES from '$constants/routes'
import tw from 'twin.macro'
import {withAxios} from '$utils/fetcher/withAxios'
import {useAlertStore} from '$contexts/StoreContext'
import cookies from 'next-cookies'
import {GetServerSideProps} from 'next'
import {MainButton} from '$styles/utils/components'
import {Letter, LetterOption} from '$types/response/letter'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'
import CommonHeader from '$components/header/CommonHeader'

interface Props {
    options: LetterOption[]
    token: string
}

const LetterEmailSend = ({options, token}: Props) => {
    const router = useRouter()
    const {confirm, alert} = useAlertStore()

    const [selectedOptionId, setSelectedOptionId] = useState<number>(-1)

    const clickOption = (option: LetterOption) => {
        if (option.id === selectedOptionId) {
            setSelectedOptionId(-1)
        } else {
            setSelectedOptionId(option.id)
        }
    }

    const onClickEmailSendButton = async () => {
        if (selectedOptionId === -1) return

        const selectedOption: LetterOption = options.filter(({id}) => id === selectedOptionId)[0]
        confirm({
            message: `정말로 "${selectedOption.text}" 기준을 선택한 사람들에게 편지를 보낼거야?`,
            onSuccess: sendMail,
        })
    }

    const sendMail = async () => {
        try {
            await withAxios<Letter>({
                url: `/mail/${selectedOptionId}`,
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            })

        } catch (e) {
            alert({
                title: '이메일 발송 중 에러가 났어!',
            })
            return
        }
        alert({
            title: '이메일 발송을 완료했어!',
        })
    }

    const goMain = () => {
        router.push(ROUTES.COVID.MAIN)
    }
    return (
        <OptionContainer>
            <div>
                <CommonHeader type={HEADER_TYPE.CLOSE} position={HEADER_POSITION.LEFT} onClick={goMain} />
                <Title>
                    (어드민) 이메일 발송 기준 선택 📮
                    <p className="sub-title">한번 더 고민하고 눌러야해! 😂</p>
                </Title>
            </div>
            <ButtonList>
                <>
                    {options.map((option) => (
                        <li key={option.id} onClick={() => clickOption(option)}>
                            <Button isClicked={option.id === selectedOptionId}>{option.text}</Button>
                        </li>
                    ))}
                </>
            </ButtonList>
            <ConfirmButton onClick={onClickEmailSendButton}>이메일 발송</ConfirmButton>
        </OptionContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {letterLogin} = cookies(context)

    const options = await withAxios<LetterOption[]>({
        url: '/letters/options',
        method: 'GET',
        headers: {
            Authorization: letterLogin,
        },
    })

    return {props: {options}}
}

type ButtonPropsType = {
    children?: ReactChild
    isClicked?: boolean
}

const OptionContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
`

const Title = styled.h3`
    ${tw`tw-font-ohsquare tw-font-bold tw-text-primary-green-500`}
    font-size: 2rem;
    line-height: 2.4rem;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 3.2rem;
    .sub-title {
        ${tw`tw-font-ohsquare-air`}
        margin-top: 0.8rem;
        font-weight: normal;
        font-size: 1.6rem;
        line-height: 1.9rem;
    }
`

const ButtonList = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 2.4rem;
    padding-bottom: 2.4rem;
`

const Button = styled.button<ButtonPropsType>([
    css`
        ${tw`tw-bg-beige-300 tw-font-ohsquare-air tw-text-grey-700`}
        min-width: 31.2rem;
        height: 5.2rem;
        border-radius: 0.4rem;
        letter-spacing: -0.015em;
        font-size: 1.6rem;
        margin-bottom: 1.6rem;
        &:hover {
            background: rgba(203, 196, 168, 0.4);
            border: 1px solid #d4cec4;
        }
    `,
    ({isClicked}) =>
        isClicked
            ? css`
                  ${tw`tw-bg-primary-yellow-600
            tw-font-bold tw-font-ohsquare tw-text-primary-green-500
            tw-border-2 tw-border-primary-green-600`}
                  &:hover {
                      background: #bb9045;
                      border: 2px solid #11373e;
                  }
              `
            : css`
                  border: 1px solid #d4cec4; // 디자인 시스템에 이 색이 없는 관계로...
              `,
])

const ConfirmButton = styled(MainButton)`
    ${tw`tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`
export default LetterEmailSend
