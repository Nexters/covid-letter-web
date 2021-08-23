const {
    REACT_APP_NAVER_CLIENT_ID,
    REACT_APP_NAVER_CLIENT_SECRET,
    REACT_APP_GOOGLE_CLIENT_ID,
    REACT_APP_GOOGLE_API_KEY,
    API_URL_BASE,
} = process.env

module.exports = {
    OAUTH: {
        NAVER: {
            CLIENT_ID: REACT_APP_NAVER_CLIENT_ID,
            CLIENT_SECRET: REACT_APP_NAVER_CLIENT_SECRET,
        },
        GOOGLE: {
            CLIENT_ID: REACT_APP_GOOGLE_CLIENT_ID,
            API_KEY: REACT_APP_GOOGLE_API_KEY,
        },
    },
    API_URL_BASE,
}
