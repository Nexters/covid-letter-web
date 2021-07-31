import {StoreProvider} from '$contexts/StoreContext'
import {render} from '@testing-library/react'
import {ReactNode} from 'react'

const renderContainerWithStore = (component: ReactNode) => render(<StoreProvider>{component}</StoreProvider>)

export * from '@testing-library/react'
export {renderContainerWithStore as render}
