export interface CovidStats {
    completeShot: number
    confirmedCase: number
    completeCure: number
    shotRate: number
    confirmedIncrease: number
    cureIncrease: number
}

export interface LetterStats {
    unsented: number
    sented: number
}

export type CovidStatResponse<T = number | string> = {
    date: string

    vaccinated: T // 2차 접종 완료자 수   <-- 접종 완료율로 변경 필요!!
    vaccinatedPer: T // 2차 접종 완료자 수 (전일대비 증감량) <-- 접종 완료율로 변경 필요!!

    confirmed: T // 확진자수
    confirmedPer: T // 확진자수 (전일대비 증감량)

    cured: T // 완치자수
    curedPer: T // 완치자수 (전일대비 증감량)

    letterSend: number // 발송된 편지
    letterPending: number // 미발송 편지수
}
