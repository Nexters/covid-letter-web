import useRequest from '$hooks/useRequest'
import {ProfileResponse} from '$types/login/naver'

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
        </div>
    )
}
export default Main
