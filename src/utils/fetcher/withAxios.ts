import {RESPONSE} from '$constants'
import {RequestConfig} from '$types/request'
import {Response} from '$types/response'
import {isSSR} from '$utils/env'
import {createMockAxiosInstance} from '$utils/__mocks__/fetcher/createMockAxiosInstance'
import axios, {AxiosInstance} from 'axios'
import {HOST_URL} from 'config'
import {AuthInterceptor} from './AuthInterceptor'

export interface MockAxiosInstance {
    target: AxiosInstance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request<T>(...args: any[]): Promise<T>
    mockRespondOnce<T extends unknown>(path: string, data: T): void
}

export const createResponse = <T>(data: T, code = RESPONSE.NORMAL): Response<T> => ({
    code,
    message: '',
    result: data,
})

const createMockMethod = (instance: AxiosInstance | MockAxiosInstance) => () => {
    if (Object.prototype.hasOwnProperty.call(instance, 'mockRespondOnce')) {
        return instance as MockAxiosInstance
    }
    const mockInstance: MockAxiosInstance = createMockAxiosInstance(instance as AxiosInstance) as MockAxiosInstance

    if (typeof jest !== 'undefined') {
        mockInstance.mockRespondOnce = <T extends unknown>(path: string, data: T) => {
            jest.spyOn(instance, 'request').mockImplementationOnce((...args): Promise<T> => {
                const [pathFromArgs] = args
                if (pathFromArgs === path || pathFromArgs.url === path) {
                    if (data instanceof Error) {
                        return Promise.reject(data)
                    }
                    return Promise.resolve(data)
                }
                throw new Error('path is different from pathFromArgs')
            })
        }
    }

    return mockInstance
}

export interface AxiosInstanceWithMock extends AxiosInstance {
    mock: () => MockAxiosInstance
}

const extendWithMock = (instance: AxiosInstance): AxiosInstanceWithMock => {
    const instanceWithMock = Object.create(instance)
    instanceWithMock.mock = createMockMethod(instanceWithMock)
    return instanceWithMock
}

export const createErrorResponse = <T>(data: T): Response<T> => ({
    code: RESPONSE.ERROR,
    message: '',
    result: data,
})

const createAxiosInstance = () => {
    const instance = axios.create()
    instance.interceptors.response.use(AuthInterceptor)
    return extendWithMock(instance)
}

const globalAxiosInstance = createAxiosInstance()

export default globalAxiosInstance

export const withAxios = async <T>(request: RequestConfig): Promise<T> => {
    /**
     * @requires response 반드시 proxy 통해서 외부 서버와 통신합니다.
     */
    const response = await globalAxiosInstance.request<T, T>({
        ...request!,
        baseURL: `${isSSR ? HOST_URL : ''}/api`,
    })

    return response
}
