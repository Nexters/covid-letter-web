import {STICKER} from '$types/response/letter'

interface NewLetter {
    answer: string
    title: string
    optionId?: number
    questionId?: number
    sticker?: STICKER
}

export interface LetterState extends NewLetter {
    addAnswer: (answer: string) => void //변수명 고민..
    addTitle: (title: string) => void
    resetAnswer: () => void
}

const createLetter = (): LetterState => {
    return {
        answer: '',
        title: '',
        optionId: 0,
        questionId: 0,
        sticker: 'OK',

        addAnswer(answer: string) {
            this.answer = answer || ''
        },

        addTitle(title: string) {
            this.title = title || ''
        },

        resetAnswer: () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore 이거 처리가 너무 어려워요 8ㅅ8 도와주세욥 ㅠㅠ
            this.title = ''
            this.answer = ''
        },
    }
}

export {createLetter}
