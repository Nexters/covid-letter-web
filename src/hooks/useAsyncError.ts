import {useState, useCallback} from 'react'

const useAsyncError = () => {
    const [, setError] = useState<Error | null>(null)

    return useCallback(
        (e: Error) =>
            setError(() => {
                throw e
            }),
        [setError],
    )
}

export default useAsyncError
