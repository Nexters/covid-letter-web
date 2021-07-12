import {User} from '$types/response/user'
import {withAxios} from '$utils/fetcher/withAxios'
import React, {useState} from 'react'
import useAsyncError from 'hooks/useAsyncError'

const Counter = () => {
    const [count, setCount] = useState<number>(0)
    const increase = () => setCount((prev) => prev + 1)
    return (
        <>
            <div>{count}</div>
            <div>
                <button onClick={increase}>+</button>
            </div>
        </>
    )
}

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
            <Counter /> {/** Warning */}
            <button onClick={handleClick}>fetch data</button>
        </div>
    )
}

export default Example
