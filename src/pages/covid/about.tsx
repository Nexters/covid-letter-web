import CommonHeader from '$components/header/CommonHeader'
import {HEADER_POSITION, HEADER_TYPE} from '$components/header/constants'

const About = () => {
    return <CommonHeader type={HEADER_TYPE.CLOSE} position={HEADER_POSITION.RIGHT} />
}

export default About
