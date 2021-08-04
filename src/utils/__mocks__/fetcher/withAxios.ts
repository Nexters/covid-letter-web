import {AxiosInstanceWithMock} from '$utils/fetcher/withAxios'
import {RequestConfig} from '$types/request'

const actualModule: {globalAxiosInstance: AxiosInstanceWithMock} = jest.requireActual('utils/fetcher/withAxios')

const {globalAxiosInstance: defaultAxiosInstance} = actualModule

const mockAxiosInstance = defaultAxiosInstance.mock()

export default mockAxiosInstance

export const withAxios = async <T = unknown>(req: RequestConfig): Promise<T> => {
    const res = await mockAxiosInstance.request<T>({
        ...req,
    })
    return res
}
