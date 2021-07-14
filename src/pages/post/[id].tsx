import {useProfileContext} from '$contexts/ProfileContext'
import {useRouter} from 'next/router'

const Post = () => {
    const {profile} = useProfileContext()
    const router = useRouter()
    const {id} = router.query

    return (
        <>
            {profile?.name}님의 게시물
            <br />
            Post: {id}
        </>
    )
}

export default Post
