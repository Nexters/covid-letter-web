const THEME_COVID_PATH = '/covid'

const ROUTES = Object.freeze({
    ROOT: '/',
    LOGIN: '/login',
    BRIDGE: '/bridge',
    COVID: {
        MAIN: `${THEME_COVID_PATH}`,
        SIDE: {
            ABOUT: `${THEME_COVID_PATH}/about`,
            FAQ: `${THEME_COVID_PATH}/faq`,
            REVIEW: `${THEME_COVID_PATH}/review`,
        },
        LETTER: {
            LIST: `${THEME_COVID_PATH}/letter`, // 메인에서 편지목록 더보기 눌렀을때 넘어오는 페이지
            ENVELOPE: `${THEME_COVID_PATH}/letter/envelope`, //메일수신함에서 로그인없이 다이렉트로 접근 시 편지 봉투 모달만 존재
            DETAIL: `${THEME_COVID_PATH}/letter/[encryptedId]`, //편지내용 상세 페이지
            OPTION: `${THEME_COVID_PATH}/letter/option`, //편지 작성 시 발송기준 선택 페이지
            NEW: `${THEME_COVID_PATH}/letter/new`, //편지 본문 작성 페이지
        },
    },
})

export default ROUTES
