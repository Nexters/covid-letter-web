import {
    isInstanceOfAccessTokenError,
    isInstanceOfCommonApiError,
    isInstanceOfRedirectArror,
} from '$utils/fetcher/ApiError'
import {apiErrorHandler} from '$utils/fetcher/apiErrorHandler'
import {Component, ReactNode} from 'react'

export interface FallbackProps {
    error: Error
}

interface Props {
    fallback: (args: FallbackProps) => ReactNode
    children: ReactNode
    withChildren?: boolean
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

    componentDidCatch(error: Error) {
        if (
            isInstanceOfCommonApiError(error) ||
            isInstanceOfRedirectArror(error) ||
            isInstanceOfAccessTokenError(error)
        ) {
            return apiErrorHandler(error)
        }
    }

    render() {
        const {error} = this.state
        const {children, fallback, withChildren = false} = this.props

        return error ? (
            <>
                {fallback({error})}
                {withChildren && children}
            </>
        ) : (
            children
        )
    }
}
