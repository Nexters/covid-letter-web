import {ProfileProvider} from '$contexts/ProfileContext'
import Profile from '$components/profile'

const Main = () => {
    return (
        <ProfileProvider>
            <Profile />
        </ProfileProvider>
    )
}
export default Main
