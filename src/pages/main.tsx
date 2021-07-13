interface MainProps {
    token: string
}

const Main = ({token}: MainProps) => {
    return <div>Welcome to Covid Letter! Current Access Token is {token}</div>
}
export default Main
