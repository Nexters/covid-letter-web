import Button from '$components/Button'
import {RESPONSE} from '$constants'
import {TokenResponse} from '$types/login/naver'
import {clearCookie} from '$utils/index'
import {withAxios} from '$utils/fetcher/withAxios'
import ROUTES from '$constants/routes'
import Router from 'next/router'
import {useProfileContext} from '$contexts/ProfileContext'

const Profile = () => {
    const {profile, error} = useProfileContext()

    if (error) throw error
    if (!profile) return <div>Loading Profile...</div>

    const setGender = (g: string | undefined) => {
        switch (g) {
            case 'F':
                return '여성'
            case 'M':
                return '남성'
            default:
                return '미정'
        }
    }

    const logout = async () => {
        const {data: logoutResult} = await withAxios<Partial<TokenResponse>>({
            url: `/login/naver/logout`,
        })

        if (logoutResult.code === RESPONSE.NORMAL) {
            clearCookie()
            Router.push(ROUTES.ROOT)
        }
    }

    const goPageOne = () => {
        Router.push('/post/1')
    }

    const {name, gender, age, email} = profile

    return (
        <div>
            <p>반갑습니다 {name}님!</p>
            <p>성별: {setGender(gender)}</p>
            <p>연령대 : {age}</p>
            <p>이메일: {email}</p>
            <Button onClick={logout}>로그아웃</Button>
            <Button onClick={goPageOne}>goPageOne</Button>
        </div>
    )
}

export default Profile
