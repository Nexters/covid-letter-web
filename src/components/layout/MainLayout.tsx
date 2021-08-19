import MainHeader from '$components/header/MainHeader'
import MainSidebar from '$components/main/MainSidebar'
import toast from '$components/toast'
import {useAlertStore} from '$contexts/StoreContext'
import useLogout from '$hooks/useLogout'
import {useState} from 'react'
import {PropsWithChildren} from 'react'

type MainLayoutProps = {
    logined: boolean
    isMobile: boolean
    isGoogleLogin: boolean
    clear: () => void
}

const MainLayout = ({children, logined, isMobile, isGoogleLogin, clear}: PropsWithChildren<MainLayoutProps>) => {
    const [sidebarShow, setSidebarShow] = useState(false)

    const openSidebar = () => setSidebarShow(true)
    const closeSidebar = () => setSidebarShow(false)

    const logout = useLogout(isGoogleLogin)
    const {alert} = useAlertStore()

    const logoutPage = () => {
        logout()
        clear()
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
            <MainHeader openSidebar={openSidebar} />
            {children}
            <MainSidebar isShow={sidebarShow} closeFn={closeSidebar} logined={logined} logout={logoutPage} />
        </>
    )
}

export default MainLayout
