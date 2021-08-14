import {STICKER} from '$types/response/letter'

interface NewLetter {
    answer: string
    optionId?: number
    questionId?: number
    sticker?: STICKER
}

export interface LetterState extends NewLetter {
    addAnswer: (answer: string) => void //변수명 고민..
    resetAnswer: () => void
}

const createLetter = (): LetterState => {
    return {
        answer: '',
        optionId: 0,
        questionId: 0,
        sticker: 'OK',

        addAnswer(answer: string) {
            this.answer = answer || ''
        },

        resetAnswer: () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.answer = ''
        },
    }
}

export {createLetter}
