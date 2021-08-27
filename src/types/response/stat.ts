export type CovidStatResponse = {
    date: string

    vaccinated: string // 2차 접종 완료율
    vaccinatedPer: string // 2차 접종 완료율 (전일대비 증감량)

    confirmed: string // 확진자수
    confirmedPer: string // 확진자수 (전일대비 증감량)

    cured: string // 완치자수
    curedPer: string // 완치자수 (전일대비 증감량)

    lettersSend: number // 발송된 편지
    lettersPending: number // 미발송 편지수
}
