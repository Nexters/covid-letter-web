import {NEXT_PUBLIC_ENV} from '$config/index'
import {useEffect, useState} from 'react'

const useTutorial = (shouldTutorialOpen: boolean) => {
    const [tutorialShow, toggle] = useState(false)
    useEffect(() => {
        if (NEXT_PUBLIC_ENV === 'local') {
            toggle(true)
            return
        }
        if (shouldTutorialOpen) {
            toggle(true)
        }
    }, [shouldTutorialOpen])

    const closeTutorial = () => {
        toggle(false)
    }

    return {tutorialShow, closeTutorial}
}

export default useTutorial
