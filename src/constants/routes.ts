const THEME_COVID_PATH = '/covid'

const ROUTES = Object.freeze({
    ROOT: '/',
    LOGIN: '/login',
    BRIDGE: '/bridge',
    POST: '/post/[id]', // example
    COVID: {
        MAIN: `${THEME_COVID_PATH}`,
        WAITING: `${THEME_COVID_PATH}/wait`,
        SIDE: {
            ABOUT: `${THEME_COVID_PATH}/about`,
            FAQ: `${THEME_COVID_PATH}/faq`,
            REVIEW: `${THEME_COVID_PATH}/review`,
        },
        LETTER: {
            LIST: `${THEME_COVID_PATH}/letter`, // 메인에서 편지목록 더보기 눌렀을때 넘어오는 페이지
            DETAIL: `${THEME_COVID_PATH}/letter/{letter_id}`, //메일수신함에서 로그인없이 다이렉트로 접근 시. letter_id는 encrypt 값
            OPTION: `${THEME_COVID_PATH}/letter/option`, //편지 작성 시 발송기준 선택 페이지
            NEW: `${THEME_COVID_PATH}/letter/new`, //편지 본문 작성 페이지
        },
    },
})

export default ROUTES
