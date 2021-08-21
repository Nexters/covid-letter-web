import {withAxios} from '$utils/fetcher/withAxios'
import {HOST_URL} from '$config'
import {AuthorizeResponse} from '$types/login/naver'
import ROUTES from '$constants/routes'
import tw from 'twin.macro'
import styled from '@emotion/styled'
import SvgNaver from 'assets/NaverLogo'
import {useAlertStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'
import {FontNanumBarunGothic} from '$styles/utils/font'

const commonTw = tw`
    tw-flex tw-text-center tw-flex-1 tw-justify-center tw-items-center
`

const Button = styled.button`
    ${commonTw}
    ${FontNanumBarunGothic('semibold')}
    ${tw`tw-text-base tw-bg-grey-000`}
    width: 100%;
    padding: ${({isMobile}: {isMobile: boolean}) => (isMobile ? '1.5rem 0' : '1.5rem 0')};
    color: #767678;
    border: 1px solid #e6e6ea;
`
interface NaverLoginButtonProps {
    returnUrl: string
    isMobile: boolean
}

const NaverLoginButton = ({returnUrl, isMobile}: NaverLoginButtonProps) => {
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
        <Button onClick={() => handleLogin()} isMobile={isMobile}>
            <SvgNaver style={{marginRight: '24px'}} />
            네이버로 계속하기
        </Button>
    )
}

export default observer(NaverLoginButton)
