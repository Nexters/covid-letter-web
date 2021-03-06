import SidebarButtonList from '$components/main/SidebarButtonList'
import Sidebar from '$components/sidebar'
import ROUTES from '$constants/routes'
import styled from '@emotion/styled'
import Welcome from '$components/main/Welcome'
import {SidebarButton} from '$components/main/types'
import {useProfileContext} from '$contexts/ProfileContext'
import LoginedWelcomeArea from '$components/main/LoginedWelcomeArea'
import {EXTERNAL_URL} from '$constants'
import useProfileError from '$hooks/useProfileError'

const SidebarContainer = styled.div`
    padding: 3.2rem 0;
`

type MainSidebarProps = {
    isShow: boolean
    logined: boolean
    closeFn: () => void
    logout: (shouldOpenResultAlert?: boolean) => void
}

const MainSidebar = ({isShow, logined, closeFn, logout}: MainSidebarProps) => {
    const {profile} = useProfileContext()
    useProfileError(() => logout(false))

    const logoutValue: SidebarButton[] = logined
        ? [
              {
                  title: (
                      <>
                          <span style={{marginRight: '1.7rem'}}>π</span>λ‘κ·Έμμ
                      </>
                  ),
                  onClick: () => {
                      closeFn()
                      logout()
                  },
              },
          ]
        : []

    return (
        <Sidebar isShow={isShow} closeFn={closeFn}>
            <SidebarContainer>
                {logined && profile ? <LoginedWelcomeArea email={profile.email as string} /> : <Welcome />}
                <SidebarButtonList
                    list={[
                        {
                            title: (
                                <>
                                    <span style={{marginRight: '1.7rem'}}>π</span>μλ, λμΌ μκ°
                                </>
                            ),
                            link: ROUTES.COVID.SIDE.ABOUT,
                        },
                        {
                            title: (
                                <>
                                    <span style={{marginRight: '1.7rem'}}>π¬</span>μμ£Ό λ¬»λ μ§λ¬Έ
                                </>
                            ),
                            link: EXTERNAL_URL.QNA,
                        },
                        {
                            title: (
                                <>
                                    <span style={{marginRight: '1.7rem'}}>π‘</span>μλΉμ€ νΌλλ°±
                                </>
                            ),
                            link: EXTERNAL_URL.FEEDBACK,
                        },
                        ...logoutValue,
                    ]}
                />
            </SidebarContainer>
        </Sidebar>
    )
}

export default MainSidebar
