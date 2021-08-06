import ROUTES from '$constants/routes'
import {css} from '@emotion/react'
import {Button, PageHeader} from 'antd'
import SvgSidemenu from 'assets/IconSideMenu'
import {useRouter} from 'next/router'
import tw from 'twin.macro'

const headerCss = css`
    padding: 15px 0 16px;
`

const titleButtonCss = css`
    button + button {
        margin-left: 2.4rem;
    }

    button.active {
        color: var(--primary-green-500);
    }
`

const headerButtonTw = tw`
    tw-p-1 tw-font-ohsquare tw-text-base tw-text-primary-green-300 hover:tw-text-primary-green-500 focus:tw-text-primary-green-500
`

const LeftButtonList = () => {
    const router = useRouter()
    return (
        <div css={titleButtonCss}>
            <Button type="link" css={headerButtonTw} className={router.pathname === ROUTES.COVID.MAIN ? 'active' : ''}>
                홈
            </Button>
            <Button
                type="link"
                css={headerButtonTw}
                className={router.pathname === ROUTES.COVID.WAITING ? 'active' : ''}>
                부치지 못한 편지
            </Button>
        </div>
    )
}

const Header = () => {
    return (
        <PageHeader
            title={<LeftButtonList />}
            css={headerCss}
            extra={
                <Button type="link" css={headerButtonTw}>
                    <SvgSidemenu />
                </Button>
            }
        />
    )
}

export default Header
