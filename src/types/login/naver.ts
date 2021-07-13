export interface AuthorizeRequest {
    redirect_uri: string
    response_type: 'code'
    client_id: string
    state: string
}

export interface AuthorizeResponse {
    redirectUrl: string
}

export enum GrandType {
    create = 'authorization_code',
    refresh = 'refresh_token',
    delete = 'delete',
}

export interface TokenRequest {
    grant_type: GrandType
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
