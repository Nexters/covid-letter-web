import ROUTES from '$constants/routes'
import {NextPageContext} from 'next'

const LoginBridge = () => {
    return null
}

LoginBridge.getInitialProps = async ({req, res, query}: NextPageContext) => {
    const {code, state} = query

    if (code && state) {
        res!.writeHead(302, {Location: ROUTES.MAIN})
        res!.end()
    }

    return {
        code,
        state,
    }
}

export default LoginBridge
