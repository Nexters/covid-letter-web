import {NEXT_PUBLIC_ENV} from '$config/index'

export const isSSR = typeof window === 'undefined'

export const isLocalEnv = NEXT_PUBLIC_ENV === 'local'
