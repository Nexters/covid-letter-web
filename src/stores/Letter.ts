import {StickerType} from '$types/response/letter'

interface Sticker {
    type: StickerType
    label: string
    desc: string
}
interface NewLetter {
    answer: string
    title: string
    questionId: number
    optionId?: number
    optionText?: string
    sticker: Sticker
}

export interface LetterState extends NewLetter {
    addAnswer: (answer: string) => void
    addTitle: (title: string) => void
    resetAnswer: () => void
    chooseOption: (optionId: number, optionText: string) => void
    chooseSticker: (sticker: Sticker) => void
    setQuestionId: (questionId: number) => void
}

const createLetter = (): LetterState => {
    return {
        answer: '',
        title: '',
        questionId: 0,
        optionId: 0,
        optionText: '',
        sticker: {
            type: undefined,
            label: '',
            desc: '',
        },

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

        chooseOption(optionId: number, optionText: string) {
            this.optionId = optionId || 0
            this.optionText = optionText || ''
        },

        chooseSticker(sticker: Sticker) {
            this.sticker = sticker || {type: undefined, label: '', desc: ''}
        },

        setQuestionId(questionId: number) {
            this.questionId = questionId || 0
        },
    }
}

export {createLetter}
