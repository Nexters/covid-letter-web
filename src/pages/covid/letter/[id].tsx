import {useRouter} from 'next/router'

const Index = () => {
    const router = useRouter()
    const {id} = router.query

    return (
        <>
            편지 봉투 - 수신메일함에서 다이렉트로 접근 시 페이지
            Letter: {id}
        </>
    )
}

export default Index
