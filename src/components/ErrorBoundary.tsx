import {isInstanceOfCommonApiError} from '$utils/fetcher/ApiError'
import {apiErrorHandler} from '$utils/fetcher/apiErrorHandler'
import {Component, ErrorInfo, ReactNode} from 'react'

interface Props {
    children: ReactNode
}

interface State {
    error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {error: null}
    }

    static getDerivedStateFromError(error: Error) {
        return {error}
    }

    componentDidCatch(error: Error, __: ErrorInfo) {
        if (isInstanceOfCommonApiError(error)) {
            return apiErrorHandler(error)
        }
    }

    render() {
        const {error} = this.state
        const {children} = this.props

        return error ? <div>Error Occur!</div> : children
    }
}
