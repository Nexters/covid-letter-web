import {User} from '$types/response/user'
import useRequest from 'hooks/useRequest'
import {Response} from '$types/response'

const Example = () => {
    const {data, error} = useRequest<Response<User>>({
        url: '/user',
        params: {
            ok: 0,
        },
    })

    if (error) throw error
    if (!data) return <div>Child Loading...</div>

    const {
        result: {name},
    } = data
    return (
        <div>
            <h3>Child</h3>
            <p>name: {name}</p>
        </div>
    )
}

export default Example
