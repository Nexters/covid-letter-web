import ROUTES from '$constants/routes'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import SvgSidemenu from 'assets/IconSideMenu'
import {useRouter} from 'next/router'
import {useState} from 'react'
import tw from 'twin.macro'
import MainSidebar from '$components/main/MainSidebar'

const HeaderWrapper = tw.div`tw-flex tw-flex-wrap tw-justify-between tw-items-center`
const HeaderLeft = tw.div`tw-flex tw-items-center tw-truncate`
const HeaderRight = tw.span`tw-truncate`

const HeaderContainer = styled.div`
    ${tw`tw-m-0 tw-truncate tw-bg-beige-300`}
    box-sizing: border-box;
    list-style: none;
    padding: 1.5rem 1.6rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    max-width: 420px;
    margin: 0 auto;
    z-index: 2000;
`

const titleButtonCss = css`
    button + button {
        margin-left: 1.6rem;
    }

    button.active {
        color: var(--primary-green-500);
    }
`

const Button = styled.button`
    ${tw`tw-font-ohsquare tw-font-bold tw-text-base tw-text-primary-green-300 hover:tw-text-primary-green-500 focus:tw-text-primary-green-500`}
    padding: 0.8rem;
    background: transparent;
    border-color: transparent;
    box-shadow: none;
`

const LeftButtonList = () => {
    const buttonList = [
        {
            text: '홈',
            link: ROUTES.COVID.MAIN,
        },
        {
            text: '부치지 못한 편지',
            link: ROUTES.COVID.LETTER.LIST, // 인혁님 브랜치에서 수정 부탁드려요 :)
        },
    ]
    const router = useRouter()
    const goLink = (link: string) => router.push(link)

    return (
        <div css={titleButtonCss}>
            {buttonList.map(({text, link}) => (
                <Button key={text} className={router.pathname === link ? 'active' : ''} onClick={() => goLink(link)}>
                    {text}
                </Button>
            ))}
        </div>
    )
}

type Props = {
    logined: boolean
    logout: () => void
}

const MainHeader = ({logined, logout}: Props) => {
    const [sidebarShow, setSidebarShow] = useState(false)

    const openSidebar = () => setSidebarShow(true)
    const closeSidebar = () => setSidebarShow(false)

    return (
        <>
            <HeaderContainer>
                <HeaderWrapper>
                    <HeaderLeft>
                        <LeftButtonList />
                    </HeaderLeft>
                    <HeaderRight>
                        <a onClick={openSidebar}>
                            <SvgSidemenu />
                        </a>
                    </HeaderRight>
                </HeaderWrapper>
            </HeaderContainer>
            <MainSidebar isShow={sidebarShow} closeFn={closeSidebar} logined={logined} logout={logout} />
        </>
    )
}

export default MainHeader
