import {isSSR} from './env'

export const clearCookie = () => {
    if (isSSR) return
    document.cookie = `access_token=; path=/; expires=${new Date(0)}`
}
