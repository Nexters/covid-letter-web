import {isSSR} from './env'

export const clearCookie = () => {
    if (isSSR) return
    document.cookie = `letterLogin=; path=/; expires=${new Date(0)}`
}
