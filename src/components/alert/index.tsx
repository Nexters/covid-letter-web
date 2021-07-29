import {useAlertStore} from '$contexts/StoreContext'
import usePortal from '$hooks/usePortal'
import styled from '@emotion/styled'
import {Button} from 'antd'
import {observer} from 'mobx-react-lite'
import React from 'react'

const Container = styled.div`
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
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    text-align: center;
    width: 100%;
    max-width: 290px;
    transform: translate(-50%, -50%);
`

const TextContainer = styled.div`
    padding: 30px 0;
    word-break: keep-all;
    overflow-wrap: break-word;
`

const AlertContainer = () => {
    const {
        isShow,
        title,
        message,
        successText,
        cancelText,
        onSuccess,
        onCancel,
        close,
    } = useAlertStore()
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
                        <h3>
                            {title}
                            <Button type={'link'} onClick={close}>
                                닫기
                            </Button>
                        </h3>
                        <div>{message}</div>
                    </TextContainer>
                    <Button onClick={handleSuccess}>{successText}</Button>
                    <Button onClick={handleCancel}>{cancelText}</Button>
                </Layer>
            </Container>
        </Portal>
    )
}

export default observer(AlertContainer)
