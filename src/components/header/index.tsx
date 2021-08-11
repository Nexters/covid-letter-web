import SidebarButtonList from '$components/main/SidebarButtonList'
import Sidebar from '$components/sidebar'
import ROUTES from '$constants/routes'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Button, PageHeader} from 'antd'
import SvgSidemenu from 'assets/IconSideMenu'
import {useRouter} from 'next/router'
import {useState} from 'react'
import tw from 'twin.macro'
import WelcomeArea from '$components/main/WelcomeArea'
import {SidebarButton} from '$components/main/types'
import useLogout from '$hooks/useLogout'
import {useProfileContext} from '$contexts/ProfileContext'
import LoginedWelcomeArea from '$components/main/LoginedWelcomeArea'

const headerCss = css`
    padding: 1.5rem 2.4rem;

    .ant-page-header-heading {
        ${tw`tw-items-center`}
    }
    .ant-page-header-heading-left,
    .ant-page-header-heading-extra {
        margin: 0;
    }
`

const titleButtonCss = css`
    button + button {
        margin-left: 1.6rem;
    }

    button.active {
        color: var(--primary-green-500);
    }
`

const headerButtonCss = css`
    ${tw`tw-font-ohsquare tw-text-base tw-text-primary-green-300 hover:tw-text-primary-green-500 focus:tw-text-primary-green-500`}
    padding: 0 .8rem
`

const SidebarContainer = styled.div`
    padding: 3.2rem 0;
`

const LeftButtonList = () => {
    const router = useRouter()
    return (
        <div css={titleButtonCss}>
            <Button type="link" css={headerButtonCss} className={router.pathname === ROUTES.COVID.MAIN ? 'active' : ''}>
                홈
            </Button>
            <Button
                type="link"
                css={headerButtonCss}
                className={router.pathname === ROUTES.COVID.LETTER.LIST ? 'active' : ''}>
                부치지 못한 편지
            </Button>
        </div>
    )
}

const MainHeader = ({logined, isGoogleLogin}: {logined: boolean; isGoogleLogin: boolean}) => {
    const {profile} = useProfileContext()
    const logout = useLogout(isGoogleLogin)
    const [sidebarShow, setSidebarShow] = useState(false)

    const openSidebar = () => setSidebarShow(true)
    const closeSidebar = () => setSidebarShow(false)
    const logoutValue: SidebarButton[] = logined
        ? [
              {
                  title: (
                      <>
                          <span style={{marginRight: '1.7rem'}}>🏃</span>로그아웃
                      </>
                  ),
                  onClick: () => {
                      closeSidebar()
                      logout()
                  },
              },
          ]
        : []
    return (
        <>
            <PageHeader
                title={<LeftButtonList />}
                css={headerCss}
                extra={
                    <a onClick={openSidebar}>
                        <SvgSidemenu />
                    </a>
                }
            />
            <Sidebar isShow={sidebarShow} closeFn={closeSidebar}>
                <SidebarContainer>
                    {logined && profile ? (
                        <LoginedWelcomeArea email={profile.email as string} name={profile.name as string} />
                    ) : (
                        <WelcomeArea />
                    )}
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
                                link: ROUTES.COVID.SIDE.FAQ,
                            },
                            {
                                title: (
                                    <>
                                        <span style={{marginRight: '1.7rem'}}>💡</span>서비스 피드백
                                    </>
                                ),
                                link: ROUTES.COVID.SIDE.REVIEW,
                            },
                            ...logoutValue,
                        ]}
                    />
                </SidebarContainer>
            </Sidebar>
        </>
    )
}

export default MainHeader
