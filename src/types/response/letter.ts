/**
 * 편지 상태
 */
export enum LetterState {
    PENDING = 'PENDING', //전송 대기
    SEND = 'SEND', //전송 완료(읽기 전)
    DISPLAYED = 'DISPLAYED', //전송완료(읽음)
}

export interface Letter {
    title: string,
    contents: string,
    email: string,
    state: LetterState,
    sticker: string,
    questionId: number,
    encryptedId: string,
    createdDate: string,
}
