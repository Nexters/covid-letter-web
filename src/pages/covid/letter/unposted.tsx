import MainHeader from '$components/header/MainHeader'
import {useState} from 'react'
import useLogout from '$hooks/useLogout'
import toast from '$components/toast'
import {PropsFromApp} from '$types/index'
import {InferGetServerSidePropsType} from 'next'
import {getServerSideProps} from '../index'

const Unposted = ({
    token,
    isGoogleLogin,
    isMobile,
}: PropsFromApp<InferGetServerSidePropsType<typeof getServerSideProps>>) => {

    const [isLogined, setIsLogined] = useState(!!token)
    const logout = useLogout(isGoogleLogin)

    const logoutPage = () => {
        logout()
        setIsLogined(false)
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
            <MainHeader logined={isLogined} logout={logoutPage} />
        </>
    )
}

export default Unposted
