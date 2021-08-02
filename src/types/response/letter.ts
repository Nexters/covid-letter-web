const LETTER_STATE = {
    SEND: 'SEND',
    PENDING: 'PENDING',
} as const
type LETTER_STATE = typeof LETTER_STATE[keyof typeof LETTER_STATE]

const STICKER = {
    HAPPY: 'HAPPY',
    EXPECT: 'EXPECT',
    SHY: 'SHY',
    LOVE: 'LOVE',
    UNHAPPY: 'UNHAPPY',
    SAD: 'SAD',
    SHOCK: 'SHOCK',
    BLUE: 'BLUE',
    SHAME: 'SHAME',
    FIGHTING: 'FIGHTING',
    GOOD: 'GOOD',
    OK: 'OK',
} as const
type STICKER = typeof STICKER[keyof typeof STICKER]

export interface Letter {
    answer: string
    contents: string
    createdDate: string
    email: string
    encryptedId: string
    id: number
    letterTo: string
    questionId: string
    state: LETTER_STATE
    sticker: STICKER
    title: string
    updateDate: string
}

export interface LetterResponse {
    email: string
    letters: Letter[]
    name: string
}

export interface Question {
    id: number
    text: string
}

export interface LetterOption {
    covidStat: number
    questions: Question[]
    text: string
}

export interface LetterOptionResponse {
    result: LetterOption[]
    code: string
    message: string
}
