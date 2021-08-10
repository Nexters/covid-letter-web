import ROUTES from '$constants/routes'
import styled from '@emotion/styled'
import IconMore from 'assets/IconMore'
import Link from 'next/link'
import tw from 'twin.macro'

const Container = styled.div`
    ${tw`tw-flex tw-text-left tw-flex-1 tw-justify-between tw-items-center`}
    margin: 3.5rem 0;
`

const WelcomeText = styled.div`
    ${tw`tw-font-ohsquare tw-font-bold tw-text-xl tw-text-primary-green-500`}
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
