import {router} from 'next/client'
import {LetterOption, Question} from '$types/response/letter'
import {withAxios} from '$utils/fetcher/withAxios'
import {useState} from 'react'
import {Button} from 'antd'

interface Props {
    question: Question
}

const LetterNew = ({question}: Props) => {
    const [currentQuestionId, setCurrentQuestionId] = useState<number>(0)
    const onClickNext = () => {
        if (currentQuestionId === question.length - 1) setCurrentQuestionId(0)
        else setCurrentQuestionId(currentQuestionId + 1)
    }
    return (
        <>
            <h2>New - 편지 내용 작성화면</h2>
            <div>{question[currentQuestionId]}</div>
            <Button onClick={onClickNext}>다음 질문</Button>
        </>
    )
}

export async function getServerSideProps() {
    const res = await withAxios<LetterOption[]>({
        url: `/letter/option`,
        method: 'GET',
    })
    const result = res.map((d) => d.questions)
    const question = result[0].map((data) => data.text)

    return {props: {question}}
}
export default LetterNew
