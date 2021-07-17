import {User} from '$types/response/user'
import {withAxios} from '$utils/fetcher/withAxios'
import React, {useState} from 'react'
import useAsyncError from 'hooks/useAsyncError'
import {Button} from 'antd'
import {css} from '@emotion/react'
import tw from 'twin.macro'

const twButtonStyle = tw`
    tw-bg-blue-100 tw-w-full
`

const Counter = () => {
    const [count, setCount] = useState<number>(0)
    const increase = () => setCount((prev) => prev + 1)
    return (
        <>
            <div>{count}</div>
            <div>
                <Button onClick={increase} type="dashed">
                    +
                </Button>
                <Button
                    onClick={increase}
                    type="primary"
                    className="tw-bg-gray-50">
                    +
                </Button>
                <Button onClick={increase} type="primary" css={twButtonStyle}>
                    +
                </Button>
            </div>
        </>
    )
}

const Example = () => {
    const throwError = useAsyncError()

    const handleClick = async (e: React.SyntheticEvent) => {
        try {
            e.preventDefault()

            await withAxios<User>({
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
