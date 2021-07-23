import {RESPONSE} from '$constants'
import {RequestConfig} from '$types/request'
import {Response} from '$types/response'
import {isSSR} from '$utils/env'
import axios from 'axios'
import {HOST_URL} from 'config'
import {AuthInterceptor} from './AuthInterceptor'

export const createResponse = <T>(
    data: T,
    code = RESPONSE.NORMAL,
): Response<T> => ({
    code,
    message: '',
    result: data,
})

export const createErrorResponse = <T>(data: T): Response<T> => ({
    code: RESPONSE.ERROR,
    message: '',
    result: data,
})

export const withAxios = async <T>(request: RequestConfig): Promise<T> => {
    const instance = axios.create()
    instance.interceptors.response.use(AuthInterceptor)

    /**
     * @requires response 반드시 proxy 통해서 외부 서버와 통신합니다.
     */
    const response = await instance.request<T, T>({
        ...request!,
        baseURL: `${isSSR ? HOST_URL : ''}/api`,
    })

    return response
}
