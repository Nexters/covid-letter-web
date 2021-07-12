import {RequestConfig} from '$types/request'
import {Response} from '$types/response'
import {isSSR} from '$utils/env'
import axios, {AxiosResponse} from 'axios'
import {HOST_URL} from 'config'
import {AuthInterceptor} from './AuthInterceptor'

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
