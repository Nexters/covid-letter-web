import ErrorBoundary, {FallbackProps} from '$components/ErrorBoundary'
import TodoList from '$components/Todo/TodoList'

const Fallback = ({error}: FallbackProps) => {
    return (
        <h4 style={{backgroundColor: '#f7c5c5', padding: '10px 15px'}}>
            Fallback Error! {error.message}
        </h4>
    )
}

export default function Home() {
    return (
        <>
            <ErrorBoundary withChildren fallback={Fallback}>
                <TodoList />
            </ErrorBoundary>
        </>
    )
}
