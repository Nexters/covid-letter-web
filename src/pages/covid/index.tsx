import {useAlertStore} from '$contexts/StoreContext'
import {Button} from 'antd'
import {observer} from 'mobx-react-lite'

const Main = () => {
    const {alert} = useAlertStore()
    const openAlert = () => {
        alert({
            title: '얼러트 실험입니다!',
        })
    }
    return <Button onClick={openAlert}>Alert 열기</Button>
}
export default observer(Main)
