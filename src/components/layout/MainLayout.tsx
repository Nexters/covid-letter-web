import MainHeader from '$components/header/MainHeader'
import MainSidebar from '$components/main/MainSidebar'
import {useState} from 'react'
import {PropsWithChildren} from 'react'

type MainLayoutProps = {
    logined: boolean
    logout: () => void
}

const MainLayout = ({children, logined, logout}: PropsWithChildren<MainLayoutProps>) => {
    const [sidebarShow, setSidebarShow] = useState(false)

    const openSidebar = () => setSidebarShow(true)
    const closeSidebar = () => setSidebarShow(false)

    return (
        <>
            <MainHeader openSidebar={openSidebar} />
            {children}
            <MainSidebar isShow={sidebarShow} closeFn={closeSidebar} logined={logined} logout={logout} />
        </>
    )
}

export default MainLayout
