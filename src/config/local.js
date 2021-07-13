const {REACT_APP_NAVER_CLIENT_ID, REACT_APP_NAVER_CLIENT_SECRET} = process.env

module.exports = {
    OAUTH: {
        NAVER: {
            CLIENT_ID: REACT_APP_NAVER_CLIENT_ID,
            CLIENT_SECRET: REACT_APP_NAVER_CLIENT_SECRET,
        },
    },
}
