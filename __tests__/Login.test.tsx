describe('로그인 화면', () => {
    /** snapshot */
    test.todo(
        '로그인 화면으로 진입하면 네이버와 구글 로그인 버튼이 렌더링된다.',
    )

    describe('로그인 상태에서 진입', () => {
        test.todo('메인으로 리다이렉트한다.')
    })

    describe('로그인 버튼을 클릭', () => {
        test.todo(
            '"네이버로 로그인" 버튼을 클릭하면 네이버 인증 api를 호출한다.',
        )
        test.todo(
            '"구로로 로그인" 버튼을 클릭하면 useGoogleLogin.signIn을 실행한다.',
        )
    })

    describe('로그인 성공', () => {
        test.todo('메인 화면으로 이동한다.')
    })

    describe('로그인 실패', () => {
        /** [TODO] 논의 */
        test.todo('에러 Alert을 띄운다.')
    })
})
