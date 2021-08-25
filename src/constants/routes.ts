const THEME_COVID_PATH = '/covid'

const ROUTES = Object.freeze({
    ROOT: '/',
    LOGIN: '/login',
    BRIDGE: '/bridge',
    COVID: {
        MAIN: `${THEME_COVID_PATH}`,
        SIDE: {
            ABOUT: `${THEME_COVID_PATH}/about`,
        },
        LETTER: {
            LIST: `${THEME_COVID_PATH}/letter`, // 메인에서 편지목록 더보기 눌렀을때 넘어오는 페이지
            DIRECT: `${THEME_COVID_PATH}/letter/direct`, //메일수신함에서 로그인없이 다이렉트로 접근 시 편지 봉투 모달만 존재
            UNPOSTED: `${THEME_COVID_PATH}/letter/unposted`, //부치지 못한 편지 목록
            DETAIL: `${THEME_COVID_PATH}/letter/[encryptedId]`, //편지내용 상세 페이지
            OPTION: `${THEME_COVID_PATH}/letter/option`, //편지 작성 시 발송기준 선택 페이지
            NEW: {
                MAIN: `${THEME_COVID_PATH}/letter/new/[optionId]`, //편지 본문 작성 페이지
                ATTACH: `${THEME_COVID_PATH}/letter/new/attach`, //편지 스티커 선택 페이지
                FINISH: `${THEME_COVID_PATH}/letter/new/finish`, //편지 발송 완료 페이지
            },
        },
    },
    ADMIN: {
        MAIL_SEND: '/admin/mucncgzwuorozpgxdfmezksawtkd', //어드민 메일 발송
    },
})

export const NEED_LOGIN_ROUTES = [...Object.values(ROUTES.COVID.LETTER), ...Object.values(ROUTES.ADMIN)]
    .filter(routeName => routeName !== ROUTES.COVID.LETTER.DIRECT && routeName !== ROUTES.COVID.LETTER.DETAIL)

export default ROUTES
