const setPort = (env?: string) => {
    switch (env) {
        case 'production':
            return 8081
        case 'local':
        default:
            return 3000
    }
}

const env = process.env.REACT_APP_ENV

const PORT = setPort(env)
const baseURL = 'http://localhost' // production 에서 추후 리얼 도메인 연결

export const HOST_URL = `${baseURL}:${PORT}`
