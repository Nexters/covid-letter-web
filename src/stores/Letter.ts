import {Sticker} from '$types/response/letter'

interface NewLetter {
    answer: string
    title: string
    questionId: number
    sticker: Sticker
}

export interface LetterState extends NewLetter {
    addAnswer: (answer: string) => void
    addTitle: (title: string) => void
    resetAnswer: () => void
}

const createLetter = (): LetterState => {
    return {
        answer: '',
        title: '',
        questionId: 0,
        sticker: 'OK',

        addAnswer(answer: string) {
            this.answer = answer || ''
        },

        addTitle(title: string) {
            this.title = title || ''
        },

        resetAnswer() {
            this.title = ''
            this.answer = ''
        },
    }
}

export {createLetter}
