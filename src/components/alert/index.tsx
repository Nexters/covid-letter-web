import {useAlertStore} from '$contexts/StoreContext'
import usePortal from '$hooks/usePortal'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import React from 'react'
import {ALERT_TYPE} from 'stores/Alert'
import tw from 'twin.macro'

const Container = styled.div`
    ${tw`tw-font-nanumBarunGothic tw-text-base`}
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2010;
`

const Layer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 0.4rem;
    box-shadow: 0px 0px 26px rgba(34, 33, 31, 0.08);
    background-color: #fff;
    overflow: hidden;
    text-align: center;
    width: 100%;
    max-width: 300px;
    transform: translate(-50%, -50%);
`

const TextContainer = styled.div`
    padding: 2.4rem;
    word-break: keep-all;
    overflow-wrap: break-word;
`

const Title = styled.div`
    ${tw`tw-text-grey-800 tw-font-semibold tw-text-base`}
`

const Message = styled.div`
    ${tw`tw-text-grey-700 tw-font-normal tw-text-base`}
    margin-top: .8rem;
`

const ButtonBox = styled.div`
    ${tw`tw-flex`}

    button {
        ${tw`tw-font-semibold`}
        flex: 1 1;
        padding: 1.5rem 0;
        border-radius: 0;
    }
`

const CancelButton = styled.button`
    ${tw`tw-bg-grey-300 hover:tw-bg-grey-300 focus:tw-bg-grey-300 tw-text-grey-500 hover:tw-text-grey-500 focus:tw-text-grey-500`}
`

const SuccessButton = styled.button`
    ${tw`tw-bg-primary-green-500 hover:tw-bg-primary-green-500 hover:tw-bg-primary-green-500 tw-text-grey-000 hover:tw-text-grey-000 focus:tw-text-grey-000`}
`

const AlertContainer = () => {
    const {type, isShow, title, message, successText, cancelText, onSuccess, onCancel, close} = useAlertStore()
    const {Portal} = usePortal()

    const handleSuccess = (e: React.SyntheticEvent) => {
        onSuccess(e)
        close(e)
    }

    const handleCancel = (e: React.SyntheticEvent) => {
        onCancel(e)
        close(e)
    }

    const handleOutsideClick = (e: React.SyntheticEvent) => {
        e.preventDefault()
        close(e)
    }

    if (!isShow) {
        return null
    }

    return (
        <Portal>
            <Container onClick={handleOutsideClick}>
                <Layer>
                    <TextContainer>
                        {title && <Title>{title}</Title>}
                        {message && (
                            <Message>
                                {message.split('\n').map((text) => (
                                    <>
                                        {text}
                                        <br />
                                    </>
                                ))}
                            </Message>
                        )}
                    </TextContainer>
                    <ButtonBox>
                        {type === ALERT_TYPE.CONFIRM && (
                            <CancelButton onClick={handleCancel}>{cancelText}</CancelButton>
                        )}
                        <SuccessButton onClick={handleSuccess}>{successText}</SuccessButton>
                    </ButtonBox>
                </Layer>
            </Container>
        </Portal>
    )
}

export default observer(AlertContainer)
