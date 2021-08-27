import {createResponse} from '$utils/fetcher/withAxios'
import {Response, ServerResponse} from '$types/response'
import {NextApiRequest, NextApiResponse} from 'next'
import {CovidStatResponse} from '$types/response/stat'
import {API_URL_BASE} from '$config/index'
import axios, {AxiosResponse} from 'axios'
import {numberFormat, pad1Digits} from '$utils/index'
import {format} from 'date-fns'

const parseToNumber = ({
    vaccinated,
    vaccinatedPer,
    confirmed,
    confirmedPer,
    cured,
    curedPer,
    ...rest
}: CovidStatResponse): CovidStatResponse => {
    const padVaccinated = pad1Digits(+vaccinated)
    const padVaccinatedPer = pad1Digits(+vaccinatedPer)
    return {
        vaccinated: numberFormat(+padVaccinated),
        vaccinatedPer: numberFormat(+padVaccinatedPer),
        confirmed: numberFormat(+confirmed),
        confirmedPer: numberFormat(+confirmedPer),
        cured: numberFormat(+cured),
        curedPer: numberFormat(+curedPer),
        ...rest,
    }
}

const routes = async (req: NextApiRequest, res: NextApiResponse<Response<CovidStatResponse>>) => {
    try {
        const {
            data: {data},
        }: AxiosResponse<ServerResponse<CovidStatResponse>> = await axios.get(`${API_URL_BASE}/covidstat`, {
            headers: req.headers,
        })

        const result = parseToNumber(data)

        res.status(200).json(createResponse<CovidStatResponse>(result))
        return
    } catch {
        res.status(200).json(
            createResponse<CovidStatResponse>({
                date: format(new Date(), 'yyyy-MM-dd'),
                vaccinated: '0', // 2차 접종 완료율
                vaccinatedPer: '0', // 2차 접종 완료율 (전일대비 증감량)
                confirmed: '0', // 확진자수
                confirmedPer: '0', // 확진자수 (전일대비 증감량)
                cured: '0', // 완치자수
                curedPer: '0', // 완치자수 (전일대비 증감량)
                lettersSend: 0, // 발송된 편지
                lettersPending: 0, // 미발송 편지수
            }),
        )
    }
}

module.exports = routes
