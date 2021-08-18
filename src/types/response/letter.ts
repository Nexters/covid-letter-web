export enum LetterState {
    PENDING = 'PENDING', //전송 대기
    SEND = 'SEND', //전송 완료(읽기 전)
    DISPLAYED = 'DISPLAYED', //전송완료(읽음)
}

export const STICKER_TYPE = {
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
export type StickerType = typeof STICKER_TYPE[keyof typeof STICKER_TYPE] | undefined

export interface Letter {
    contents: string
    createdDate: string
    email: string
    encryptedId: string
    questionId: string
    state: LetterState
    sticker: StickerType
    title: string
}

export interface Question {
    id: number
    text: string
    commonOptionId: boolean
}

export interface LetterOption {
    id: number
    covidStat: number
    text: string
}

export interface LetterOptionResponse {
    result: LetterOption[]
    code: string
    message: string
}
