import ROUTES from '$constants/routes'
import {FontOhsquare} from '$styles/utils/font'
import {FlexBetween} from '$styles/utils/layout'
import styled from '@emotion/styled'
import IconMore from 'assets/IconMore'
import Link from 'next/link'
import tw from 'twin.macro'

const Container = styled.div`
    ${FlexBetween}
    ${tw`tw-text-left`}
    margin: 3.5rem 0;
`

const WelcomeText = styled.div`
    ${FontOhsquare}
    ${tw`tw-text-xl tw-text-primary-green-500`}
`

const WelcomeArea = () => {
    return (
        <Link href={ROUTES.LOGIN}>
            <a>
                <Container>
                    <WelcomeText>
                        3초 만에 로그인하고
                        <br />
                        편하게 이용하기
                    </WelcomeText>

                    <IconMore />
                </Container>
            </a>
        </Link>
    )
}

export default WelcomeArea
