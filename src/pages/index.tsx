import ROUTES from '$constants/routes'

const Index = () => {
    return <h4 style={{backgroundColor: '#f7c5c5', padding: '10px 15px'}}>접근할 수 없는 페이지입니다.</h4>
}

export async function getServerSideProps() {
    return {
        redirect: {
            destination: ROUTES.COVID.MAIN,
            permanent: false,
        },
    }
}

export default Index
