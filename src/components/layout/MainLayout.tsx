import MainHeader from '$components/header/MainHeader'
import MainSidebar from '$components/main/MainSidebar'
import PcBackground from '$components/main/PcBackground'
import toast from '$components/toast'
import {useAlertStore, useAuthStore} from '$contexts/StoreContext'
import useLogout from '$hooks/useLogout'
import {observer} from 'mobx-react-lite'
import {useState} from 'react'
import {PropsWithChildren} from 'react'

type MainLayoutProps = {
    isMobile: boolean
    isGoogleLogin: boolean
}

const MainLayout = ({children, isMobile, isGoogleLogin}: PropsWithChildren<MainLayoutProps>) => {
    const [sidebarShow, setSidebarShow] = useState(false)

    const openSidebar = () => setSidebarShow(true)
    const closeSidebar = () => setSidebarShow(false)

    const {isLogined, clearUser} = useAuthStore()

    const logout = useLogout(isGoogleLogin)
    const {alert} = useAlertStore()

    const logoutPage = () => {
        logout()
        clearUser()
        if (!isMobile) {
            alert({
                title: '로그아웃 됐어. 다시 돌아올거지?',
            })
        } else {
            toast('로그아웃 됐어. 다시 돌아올거지?', 1500)
        }
    }

    return (
        <>
            {!isMobile && <PcBackground />}
            <MainHeader openSidebar={openSidebar} />
            {children}
            <MainSidebar isShow={sidebarShow} closeFn={closeSidebar} logined={isLogined} logout={logoutPage} />
        </>
    )
}

export default observer(MainLayout)
