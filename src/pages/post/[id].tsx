import {useRouter} from 'next/router'

const Post = () => {
    const router = useRouter()
    const {id} = router.query

    return <>Post: {id}</>
}

export default Post
