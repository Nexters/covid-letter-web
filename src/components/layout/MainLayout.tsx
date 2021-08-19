import MainHeader from '$components/header/MainHeader'
import {PropsWithChildren} from 'react'

type MainLayoutProps = {
    logined: boolean
    logout: () => void
}

const MainLayout = ({children, logined, logout}: PropsWithChildren<MainLayoutProps>) => {
    return (
        <>
            <MainHeader logined={logined} logout={logout} />
            {children}
        </>
    )
}

export default MainLayout
