import {GRANT_TYPE} from '$constants'

export type GrantType = typeof GRANT_TYPE[keyof typeof GRANT_TYPE]
export interface AuthorizeRequest {
    redirect_uri: string
    response_type: 'code'
    client_id: string
    state: string
}

export interface AuthorizeResponse {
    redirectUrl: string
}

export interface TokenRequest {
    grant_type: GrantType
    client_id: string
    client_secret: string
    code: string
    state: string
    service_provider: 'NAVER'
    refresh_token: string
    access_token: string
}

export interface TokenResponse {
    access_token: string
    token_type: 'Bearer' | 'MAC'
    expires_in: number
    refresh_token?: string
    error?: string
    error_description?: string
}

export interface Profile {
    id: string
    nickname: string
    name: string
    email: string
    gender: string
    age: string
    birthday: string
    profile_image: string
    birthyear: string
    mobile: string
}

export interface ProfileResponse {
    resultcode: string
    message: string
    response: Partial<Profile>
}

export interface VerifyResponse {
    resultcode: string
    message: string
    response: {
        token: string
        expire_date: string
        allowed_profile: string
    }
}
