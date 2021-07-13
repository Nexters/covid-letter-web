import ROUTES from '$constants/routes'
import {NextPageContext} from 'next'
import cookies from 'next-cookies'
import Router from 'next/router'

interface MainProps {
    token: string
}

const Main = ({token}: MainProps) => {
    return <div>Welcome to Covid Letter! Current Access Token is {token}</div>
}

Main.getInitialProps = async (ctx: NextPageContext) => {
    const {at} = cookies(ctx)

    if (!at) {
        if (ctx.req && ctx.res) {
            ctx.res!.writeHead(302, {Location: ROUTES.ROOT})
            ctx.res!.end()
        } else {
            Router.push(ROUTES.ROOT)
        }
    }

    return {token: at}
}
export default Main
