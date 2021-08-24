import {useEffect, useState} from 'react'

const useTutorial = (shouldTutorialOpen: boolean) => {
    const [tutorialShow, toggle] = useState(false)
    useEffect(() => {
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
