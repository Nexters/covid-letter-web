import {StickerType} from '$types/response/letter'

interface Sticker {
    type: StickerType
    label: string
    desc: string
}
interface NewLetter {
    answer: string
    title: string
    questionId: number | null
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
    setQuestionId: (questionId: number | null) => void
    resetStore: () => void
}

const createLetter = (): LetterState => {
    return {
        answer: '',
        title: '',
        questionId: 1,
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

        setQuestionId(questionId: number | null) {
            if (!questionId) this.questionId = null
            else this.questionId = questionId
        },

        resetStore() {
            this.answer = ''
            this.title = ''
            this.questionId = 1
            this.optionId = 0
            this.optionText = ''
            this.sticker = {
                type: undefined,
                label: '',
                desc: '',
            }
        },
    }
}

export {createLetter}
