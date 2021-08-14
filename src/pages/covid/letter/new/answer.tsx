import {useLetterStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'

const Answer = () => {
    const {answer, addAnswer, resetAnswer} = useLetterStore()
    return <textarea value={answer} onChange={(e) => addAnswer(e.target.value)} />
}

export default observer(Answer)
