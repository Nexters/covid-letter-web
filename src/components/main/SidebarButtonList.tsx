import styled from '@emotion/styled'
import Link from 'next/link'
import tw from 'twin.macro'
import {SidebarButton} from './types'

const ButtonList = styled.ul`
    padding: 2.4rem 0;

    li + li {
        margin-top: 0.8rem;
    }
`

const ButtonItem = styled.li`
    ${tw`tw-text-left tw-font-nanumBarunGothic tw-font-semibold tw-text-base tw-text-grey-800`}
    width: 100%;
    padding: 1.4rem 0;
`

interface SidebarButtonListProps {
    list: SidebarButton[]
}

const SidebarButtonList = ({list}: SidebarButtonListProps) => {
    return (
        <ButtonList>
            {list.map(({title, link, onClick}, index) => (
                <ButtonItem key={index}>
                    <Link href={link as string}>
                        <a onClick={onClick}>{title}</a>
                    </Link>
                </ButtonItem>
            ))}
        </ButtonList>
    )
}

export default SidebarButtonList
