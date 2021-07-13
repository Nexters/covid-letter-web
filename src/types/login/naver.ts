export interface AuthorizeRequest {
    redirect_uri: string
    response_type: 'code'
    client_id: string
    state: string
}

export interface AuthorizeResponse {
    redirectUrl: string
}
