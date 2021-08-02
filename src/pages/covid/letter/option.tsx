import {LetterOption} from '$types/response/letter'
import {withAxios} from '$utils/fetcher/withAxios'

interface Props {
    options: string[]
}
const onClickOption = () => {
    console.log('click option')
}
const LetterOptionPage = ({options}: Props) => {
    return (
        <>
            {options.map((option) => (
                <li key={option} onClick={onClickOption}>
                    {option}
                </li>
            ))}
        </>
    )
}

export async function getStaticProps() {
    const res = await withAxios<LetterOption[]>({
        url: '/letter/option',
        method: 'GET',
    })

    const options = res.map((d) => d.text)

    return {props: {options}}
}
export default LetterOptionPage
