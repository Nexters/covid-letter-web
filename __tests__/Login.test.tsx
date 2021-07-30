import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor} from '@testing-library/react'
import {StoreProvider} from '../src/contexts/StoreContext'
import Login from '../src/pages/login'
import NaverLoginButton from '../src/components/login/NaverLoginButton'
import GoogleLoginButton from '../src/components/login/GoogleLoginButton'
import ROUTES from '../src/constants/routes'

const renderComponent = () => {
    return render(
        <StoreProvider>
            <Login />
        </StoreProvider>,
    )
}

describe('로그인 화면', () => {
    /** snapshot */
    test('로그인 화면으로 진입하면 네이버와 구글 로그인 버튼이 렌더링된다.', async () => {
        const {container} = renderComponent()

        const {container: naverLoginButtonContainer} = render(<NaverLoginButton returnUrl={ROUTES.ROOT} />)

        const {container: googleLoginButtonContainer} = render(<GoogleLoginButton returnUrl={ROUTES.ROOT} />)

        await waitFor(() => {
            expect(container).toContainHTML(naverLoginButtonContainer.innerHTML)
            expect(container).toContainHTML(googleLoginButtonContainer.innerHTML)
        })
    })

    describe('로그인 버튼을 클릭', () => {
        test.todo('"네이버로 로그인" 버튼을 클릭하면 네이버 인증 api를 호출한다.')
        test.todo('"구로로 로그인" 버튼을 클릭하면 useGoogleLogin.signIn을 실행한다.')
    })

    describe('로그인 성공', () => {
        test.todo('메인 화면으로 이동한다.')
    })

    describe('로그인 실패', () => {
        /** [TODO] 논의 */
        test.todo('에러 Alert을 띄운다.')
    })
})
