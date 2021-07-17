import {RequestConfig} from '$types/request'
import {withAxios} from '$utils/fetcher/withAxios'
import {AxiosError} from 'axios'
import useSWR, {SWRConfiguration, SWRResponse} from 'swr'

interface SwrReturn<Data, Error>
    extends Pick<
        SWRResponse<Data, AxiosError<Error>>,
        'isValidating' | 'revalidate' | 'error' | 'mutate'
    > {
    data: Data | undefined
    response: Data | undefined
}

export interface SwrConfig<Data = unknown, Error = unknown>
    extends Omit<SWRConfiguration<Data, AxiosError<Error>>, 'initialData'> {
    initialData?: Data
}

export default function useRequest<Data = unknown, Error = unknown>(
    request: RequestConfig,
    {initialData, ...config}: SwrConfig<Data, Error> = {},
): SwrReturn<Data, Error> {
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
            initialData,
        },
    )

    return {
        data: response,
        response,
        error,
        isValidating,
        revalidate,
        mutate,
    }
}
