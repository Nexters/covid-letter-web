import {withAxios} from '$utils/fetcher/withAxios'
import {HOST_URL} from '$config'
import {AuthorizeResponse} from '$types/login/naver'
import ROUTES from '$constants/routes'
import {Button} from 'antd'
import {useAlertStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'

interface NaverLoginButtonProps {
    returnUrl: string
}

const NaverLoginButton = ({returnUrl}: NaverLoginButtonProps) => {
    const {alert} = useAlertStore()

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
            alert({
                title: '로그인에 실패했습니다.',
            })
        }
    }
    return (
        <Button type={'primary'} block onClick={() => handleLogin()}>
            네이버로 로그인
        </Button>
    )
}

export default observer(NaverLoginButton)
