import {Question} from '$types/response/letter'
import {withAxios} from '$utils/fetcher/withAxios'
import {useState} from 'react'

interface Props {
    question: Question[]
}
const INITIAL_ID = 0

const LetterNew = ({question}: Props) => {
    const [currentQuestionId, setCurrentQuestionId] = useState<number>(INITIAL_ID)
    const onClickNext = () => {
        if (currentQuestionId === question.length - 1) setCurrentQuestionId(INITIAL_ID)
        else setCurrentQuestionId(currentQuestionId + 1)
    }
    return (
        <>
            <h2>New - 편지 내용 작성화면</h2>
            <div>{question[currentQuestionId].text}</div>
            <button onClick={onClickNext}>다음 질문</button>
        </>
    )
}

export async function getServerSideProps(context: {query: {optionId: number}}) {
    const {optionId} = context.query
    const res = await withAxios<Question[]>({
        url: `/letters/options/${optionId}/questions`,
        method: 'GET',
    })
    const question = res

    return {props: {question}}
}
export default LetterNew
