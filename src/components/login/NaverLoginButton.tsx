import {withAxios} from '$utils/fetcher/withAxios'
import {HOST_URL} from '$config'
import {AuthorizeResponse} from '$types/login/naver'
import ROUTES from '$constants/routes'
import useAsyncError from '$hooks/useAsyncError'
import {Button} from 'antd'

interface NaverLoginButtonProps {
    returnUrl: string
}

const NaverLoginButton = ({returnUrl}: NaverLoginButtonProps) => {
    const throwError = useAsyncError()
    const handleLogin = async () => {
        try {
            const res = await withAxios<AuthorizeResponse>({
                url: `/login/naver/authorize`,
                method: 'get',
                params: {
                    redirect_uri: encodeURIComponent(
                        `${HOST_URL}${ROUTES.BRIDGE}/naver?returnUrl=${encodeURIComponent(returnUrl)}`,
                    ),
                },
            })

            const {redirectUrl} = res
            window.location.replace(`${redirectUrl}`)
        } catch (e) {
            throwError(e)
        }
    }
    return (
        <Button type={'primary'} block onClick={() => handleLogin()}>
            네이버로 로그인
        </Button>
    )
}

export default NaverLoginButton
