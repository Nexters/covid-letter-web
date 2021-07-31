import {AxiosInstanceWithMock} from '$utils/fetcher/withAxios'
import {RequestConfig} from '$types/request'

const actualModule: {default: AxiosInstanceWithMock} = jest.requireActual('../../fetcher/withAxios')

const {default: defaultAxiosInstance} = actualModule

const mockAxiosInstance = defaultAxiosInstance.mock()

export default mockAxiosInstance

export const withAxios = async <T = unknown>(req: RequestConfig): Promise<T> => {
    const res = await mockAxiosInstance.request<T>({
        ...req,
    })
    return res
}
