const env = process.env.REACT_APP_ENV

export const HOST_URL = env === 'local' ? 'http://localhost:3000' : '' // real domain
