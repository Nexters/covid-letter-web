import ROUTES from '$constants/routes'
import {ReactNode} from 'react'

export type Routes = typeof ROUTES[keyof typeof ROUTES]

export interface SidebarButton {
    title: ReactNode
    link: Routes
}
