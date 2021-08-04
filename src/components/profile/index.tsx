import {Button} from 'antd'
import {withAxios} from '$utils/fetcher/withAxios'
import ROUTES from '$constants/routes'
import {useRouter} from 'next/router'
import {useProfileContext} from '$contexts/ProfileContext'
import {NextPageContext} from 'next'
import cookies from 'next-cookies'
import {useGoogleLogout} from 'react-google-login'
import {GOOGLE} from '$config'

interface ProfileProps {
    isGoogleLogin?: boolean
}

const Profile = ({isGoogleLogin}: ProfileProps) => {
    const routes = useRouter()

    const requestLogout = async () => {
        await withAxios<string>({
            url: `/logout`,
        })

        routes.push(ROUTES.LOGIN)
    }
    const {signOut} = useGoogleLogout({
        clientId: GOOGLE.CLIENT_ID,
        onLogoutSuccess: requestLogout,
        onFailure: () => {
            console.error('구글 계정 로그아웃에 실패했습니다.')
        },
    })
    const {profile, error} = useProfileContext()

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

    const logout = () => {
        if (isGoogleLogin) {
            signOut()
            return
        }
        requestLogout()
    }

    const goPageOne = () => {
        routes.push('/post/1')
    }

    const goLogin = () => {
        routes.push(ROUTES.LOGIN)
    }
    if (error) throw error
    if (!profile)
        return (
            <div>
                로그인이 필요합니다.
                <Button type={'ghost'} block onClick={goLogin}>
                    로그인
                </Button>
            </div>
        )

    const {name, gender, age, email} = profile

    return (
        <div>
            <p>반갑습니다 {name}님!</p>
            <p>성별: {setGender(gender)}</p>
            <p>연령대 : {age}</p>
            <p>이메일: {email}</p>
            <Button onClick={logout}>로그아웃</Button>{' '}
            <Button onClick={goPageOne}>goPageOne</Button>
        </div>
    )
}

Profile.getInitialProps = ({req, res}: NextPageContext) => {
    const {googleLogin} = cookies({req})

    if (googleLogin) {
        return {
            isGoogleLogin: true,
        }
    }
    return {
        isGoogleLogin: false,
    }
}

export default Profile
