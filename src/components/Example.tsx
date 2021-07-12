import {User} from '$types/response/user'
import {withAxios} from '$utils/fetcher/withAxios'
import React from 'react'
import useAsyncError from 'hooks/useAsyncError'

const Example = () => {
    const throwError = useAsyncError()

    const handleClick = async (e: React.SyntheticEvent) => {
        try {
            e.preventDefault()

            const response = await withAxios<User>({
                url: '/user',
                params: {
                    ok: 0,
                },
            })
        } catch (error) {
            throwError(error)
        }
    }
    return (
        <div>
            <h3>Child</h3>
            <button onClick={handleClick}>fetch data</button>
        </div>
    )
}

export default Example
