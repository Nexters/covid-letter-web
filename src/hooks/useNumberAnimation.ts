import {useTransition} from 'react-spring'

const useNumberAnimation = (numberStr: string) => {
    const numberList = numberStr.split('').map((number, index) => ({
        number,
        id: `${number}-${index}`,
    }))

    let delayTime = 0
    const transitions = useTransition(numberList, {
        keys: (item) => item.id,
        from: {opacity: 0, transform: 'translate3d(0,-10px,0)'},
        enter: {opacity: 1, transform: 'translate3d(0,0px,0)'},
        leave: {opacity: 0, transform: 'translate3d(0,-10px,0)'},
        delay: () => {
            delayTime += 35
            return delayTime
        },
    })

    return transitions
}

export default useNumberAnimation
