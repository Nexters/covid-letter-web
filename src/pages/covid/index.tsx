import HalfLayer from '$components/layer/HalfLayer'
import {useAlertStore} from '$contexts/StoreContext'
import styled from '@emotion/styled'
import {Button} from 'antd'
import {observer} from 'mobx-react-lite'
import {useState} from 'react'

const Container = styled.div`
    background-color: #f2f2f2;
    min-height: 100vh;
    height: 100%;
`

const Main = () => {
    const {alert} = useAlertStore()

    const [isShow, setIsShow] = useState(false)
    const openAlert = () => {
        alert({
            title: '얼러트 실험입니다!',
        })
    }

    const openHalfLayer = () => {
        setIsShow(true)
    }
    const close = () => setIsShow(false)
    return (
        <Container>
            <Button onClick={openAlert}>Alert 열기</Button>
            <Button onClick={openHalfLayer}>HalfLayer 열기</Button>
            <HalfLayer isShow={isShow} closeFn={close}>
                무슨 내용을 적지
            </HalfLayer>
        </Container>
    )
}
export default observer(Main)
