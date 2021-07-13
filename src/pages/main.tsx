import useRequest from '$hooks/useRequest'
import {ProfileResponse} from '$types/login/naver'

interface MainProps {
    token: string
}

const Main = ({token}: MainProps) => {
    const {data, error} = useRequest<ProfileResponse>({
        url: '/login/naver/profile',
    })

    if (error) throw error
    if (!data) return <div>loading...</div>
    return <div>Welcome to Covid Letter! Current Access Token is {token}</div>
}
export default Main
