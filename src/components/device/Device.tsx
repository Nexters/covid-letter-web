import {ReactNode} from 'react'
import * as rdd from 'react-device-detect'

const Device = ({children}: {children: (props: typeof rdd) => ReactNode}) => {
    return <>{children(rdd)}</>
}

export default Device
