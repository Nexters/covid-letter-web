import {RequestConfig} from '$types/request'
import {Response} from '$types/response'
import {withAxios} from '$utils/fetcher/withAxios'
import {AxiosError, AxiosResponse} from 'axios'
import useSWR, {SWRConfiguration, SWRResponse} from 'swr'

interface SwrReturn<Data, Error>
    extends Pick<
        SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
        'isValidating' | 'revalidate' | 'error' | 'mutate'
    > {
    data: Data | undefined
    response: AxiosResponse<Data> | undefined
}

export interface SwrConfig<Data = unknown, Error = unknown>
    extends Omit<
        SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
        'initialData'
    > {
    initialData?: Data
}

export default function useRequest<Data = unknown, Error = unknown>(
    request: RequestConfig,
    {initialData, ...config}: SwrConfig<Response<Data>, Error> = {},
): SwrReturn<Response<Data>, Error> {
    const {
        data: response,
        error,
        isValidating,
        revalidate,
        mutate,
    } = useSWR(
        request && JSON.stringify(request),
        () => withAxios<Data>(request),
        {
            ...config,
            initialData: initialData && {
                status: 200,
                statusText: 'init',
                config: request!,
                headers: {},
                data: initialData,
            },
        },
    )

    return {
        data: response && response.data,
        response,
        error,
        isValidating,
        revalidate,
        mutate,
    }
}
