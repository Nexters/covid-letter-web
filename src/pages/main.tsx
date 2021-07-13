import Button from '$components/Button'
import {GrantType, RESPONSE} from '$constants'
import ROUTES from '$constants/routes'
import useRequest from '$hooks/useRequest'
import {ProfileResponse, TokenResponse} from '$types/login/naver'
import {clearCookie} from '$utils/index'
import {withAxios} from '$utils/fetcher/withAxios'
import Router from 'next/router'

const Main = () => {
    const {data, error} = useRequest<ProfileResponse>({
        url: '/login/naver/profile',
    })

    if (error) throw error
    if (!data) return <div>loading...</div>

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
            url: `/login/naver/token`,
            method: 'post',
            data: {
                grant_type: GrantType.delete,
                service_provider: 'NAVER',
            },
        })

        if (logoutResult.code === RESPONSE.NORMAL) {
            clearCookie()
            Router.push(ROUTES.ROOT)
        }
    }

    const goPageOne = () => {
        Router.push('/post/1')
    }

    const {
        result: {
            response: {name, gender, age, email},
        },
    } = data

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
export default Main
