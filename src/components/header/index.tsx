import Sidebar from '$components/sidebar'
import ROUTES from '$constants/routes'
import {css} from '@emotion/react'
import {Button, PageHeader} from 'antd'
import SvgSidemenu from 'assets/IconSideMenu'
import {useRouter} from 'next/router'
import {useState} from 'react'
import tw from 'twin.macro'

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
                className={router.pathname === ROUTES.COVID.WAITING ? 'active' : ''}>
                부치지 못한 편지
            </Button>
        </div>
    )
}

const Header = () => {
    const [sidebarShow, setSidebarShow] = useState(false)

    const openSidebar = () => setSidebarShow(true)
    const closeSidebar = () => setSidebarShow(false)
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
            <Sidebar isShow={sidebarShow} closeFn={closeSidebar}></Sidebar>
        </>
    )
}

export default Header
