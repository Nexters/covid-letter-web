import '@testing-library/jest-dom/extend-expect'
import {cleanup, fireEvent, render, waitFor} from '$utils/custom-testing-library'
import Login from '../../pages/login'
import NaverLoginButton from '$components/login/NaverLoginButton'
import GoogleLoginButton from '$components/login/GoogleLoginButton'
import ROUTES from '$constants/routes'
import withAxios from '$utils/__mocks__/fetcher/withAxios'
import {AuthorizeResponse} from '$types/login/naver'
import {MatcherFunction} from '@testing-library/dom/types/matches'
import {UseGoogleLoginResponse} from 'react-google-login'
import {ApiError} from '$utils/fetcher/ApiError'
import {observable} from 'mobx'
import {AlertState} from 'stores/Alert'

jest.mock('utils/fetcher/withAxios', () => jest.requireActual('utils/__mocks__/fetcher/withAxios'))

let mockGoogleLogin: UseGoogleLoginResponse

beforeEach(() => {
    mockGoogleLogin = {
        signIn: jest.fn(),
        loaded: false,
    }
})

jest.mock('react-google-login', () => {
    return {
        useGoogleLogin: () => {
            return mockGoogleLogin
        },
    }
})

const NAVER_LOGIN_API = '/login/naver/authorize'

const mockNaverLogin = (data: AuthorizeResponse | Error) => {
    withAxios.mockRespondOnce<AuthorizeResponse | Error>(NAVER_LOGIN_API, data)
}

const actualAlertStore = jest.requireActual('stores/Alert')
let mockAlertStore: AlertState = {} as AlertState

beforeEach(() => {
    const store = {
        ...actualAlertStore.createAlert(),
    }
    mockAlertStore = observable(store)
})

jest.mock('stores/Alert', () => ({
    createAlert: () => {
        return mockAlertStore
    },
}))

afterEach(() => {
    cleanup()
})

const renderComponent = () => {
    return render(<Login isMobile={false} />)
}

describe('로그인 화면', () => {
    /** snapshot */
    test('로그인 화면으로 진입하면 네이버와 구글 로그인 버튼이 렌더링된다.', async () => {
        const {container} = renderComponent()

        const {container: naverLoginButtonContainer} = render(
            <NaverLoginButton returnUrl={ROUTES.ROOT} isMobile={false} />,
        )

        const {container: googleLoginButtonContainer} = render(
            <GoogleLoginButton returnUrl={ROUTES.ROOT} isMobile={false} />,
        )

        await waitFor(() => {
            expect(container.innerHTML).toContain(naverLoginButtonContainer.innerHTML)
            expect(container.innerHTML).toContain(googleLoginButtonContainer.innerHTML)
        })
    })

    describe('로그인 버튼을 클릭', () => {
        test('"네이버로 로그인" 버튼을 클릭하면 네이버 인증 api를 호출한다.', async () => {
            window.location.replace = jest.fn()
            mockNaverLogin({
                redirectUrl: 'https://www.naver.com',
            })

            const {findByText} = renderComponent()

            let naverLoginButton: Element | null = null

            const cb: MatcherFunction = (_content, element) => {
                if (!element) {
                    return false
                }
                if (element.tagName === 'BUTTON' && element.textContent === '네이버로 계속하기') {
                    naverLoginButton = element
                    return true
                }
                return false
            }

            await findByText(cb)

            if (naverLoginButton) {
                fireEvent.click(naverLoginButton)
            }

            await waitFor(() => {
                expect(window.location.replace).toHaveBeenCalledWith('https://www.naver.com')
            })
        })

        test('"구글로 로그인" 버튼을 클릭하면 useGoogleLogin.signIn을 실행한다.', async () => {
            const {findByText} = renderComponent()

            let googleLoginButton: Element | null = null

            const cb: MatcherFunction = (_content, element) => {
                if (!element) {
                    return false
                }
                if (element.tagName === 'BUTTON' && element.textContent === 'Google로 계속하기') {
                    googleLoginButton = element
                    return true
                }
                return false
            }

            await findByText(cb)

            if (googleLoginButton) {
                fireEvent.click(googleLoginButton)
            }

            await waitFor(() => {
                expect(mockGoogleLogin.signIn).toHaveBeenCalledTimes(1)
            })
        })
    })

    describe('인증서버 오류', () => {
        /** [TODO] 논의 */
        test('에러 Alert을 띄운다.', async () => {
            const spyOnAlert = jest.spyOn(mockAlertStore, 'alert').mockImplementationOnce(() => null)

            mockNaverLogin(new ApiError('TEST ERROR'))
            const {findByText} = renderComponent()

            let naverLoginButton: Element | null = null

            const cb: MatcherFunction = (_content, element) => {
                if (!element) {
                    return false
                }
                if (element.tagName === 'BUTTON' && element.textContent === '네이버로 계속하기') {
                    naverLoginButton = element
                    return true
                }
                return false
            }

            await findByText(cb)

            if (naverLoginButton) {
                fireEvent.click(naverLoginButton)
            }

            await waitFor(() => {
                expect(spyOnAlert).toHaveBeenCalledWith(
                    expect.objectContaining({
                        title: '로그인에 실패했습니다.',
                    }),
                )
            })
        })
    })
})
