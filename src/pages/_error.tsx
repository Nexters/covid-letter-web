import {NextPageContext} from 'next'
import {PropsWithChildren} from 'react'

const Error = ({stautsCode}: PropsWithChildren<{stautsCode?: number}>) => {
    const message = stautsCode === 404 ? 'NOT FOUND' : 'SYSTEM_ERROR'
    return <div>{message}</div>
}

Error.getInitialProps = ({res, err}: NextPageContext) => {
    const stautsCode = res ? res.statusCode : err ? err.statusCode : 404

    return {stautsCode}
}
export default Error
