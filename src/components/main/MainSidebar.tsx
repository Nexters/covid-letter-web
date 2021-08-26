import SidebarButtonList from '$components/main/SidebarButtonList'
import Sidebar from '$components/sidebar'
import ROUTES from '$constants/routes'
import styled from '@emotion/styled'
import Welcome from '$components/main/Welcome'
import {SidebarButton} from '$components/main/types'
import {useProfileContext} from '$contexts/ProfileContext'
import LoginedWelcomeArea from '$components/main/LoginedWelcomeArea'
import {EXTERNAL_URL} from '$constants'

const SidebarContainer = styled.div`
    padding: 3.2rem 0;
`

type MainSidebarProps = {
    isShow: boolean
    logined: boolean
    closeFn: () => void
    logout: () => void
}

const MainSidebar = ({isShow, logined, closeFn, logout}: MainSidebarProps) => {
    const {profile} = useProfileContext()
    const logoutValue: SidebarButton[] = logined
        ? [
              {
                  title: (
                      <>
                          <span style={{marginRight: '1.7rem'}}>🏃</span>로그아웃
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
                                    <span style={{marginRight: '1.7rem'}}>👋</span>안녕, 나야 소개
                                </>
                            ),
                            link: ROUTES.COVID.SIDE.ABOUT,
                        },
                        {
                            title: (
                                <>
                                    <span style={{marginRight: '1.7rem'}}>💬</span>자주 묻는 질문
                                </>
                            ),
                            link: EXTERNAL_URL.QNA,
                        },
                        {
                            title: (
                                <>
                                    <span style={{marginRight: '1.7rem'}}>💡</span>서비스 피드백
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
