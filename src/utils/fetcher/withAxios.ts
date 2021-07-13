import {RESPONSE} from '$constants'
import {RequestConfig} from '$types/request'
import {Response} from '$types/response'
import {isSSR} from '$utils/env'
import axios, {AxiosResponse} from 'axios'
import {HOST_URL} from 'config'
import {AuthInterceptor} from './AuthInterceptor'

export const createResponse = <T>(data: T): Response<T> => ({
    code: RESPONSE.NORMAL,
    message: '',
    result: data,
})

export const createErrorResponse = <T>(data: T): Response<T> => ({
    code: RESPONSE.ERROR,
    message: '',
    result: data,
})

export const withAxios = async <T>(
    request: RequestConfig,
): Promise<AxiosResponse<Response<T>>> => {
    const instance = axios.create()
    instance.interceptors.response.use(AuthInterceptor)

    const response = await instance.request({
        ...request!,
        baseURL: `${isSSR ? HOST_URL : ''}/api`, // be에서 url 논의 필요
    })

    return response
}
