import {createResponse} from '$utils/fetcher/withAxios'
import {Response, ServerResponse} from '$types/response'
import {NextApiRequest, NextApiResponse} from 'next'
import {CovidStatResponse} from '$types/response/stat'
import {API_URL_BASE} from '$config/index'
import axios, {AxiosResponse} from 'axios'
import {numberFormat} from '$utils/index'

const parseToNumber = ({
    vaccinated,
    vaccinatedPer,
    confirmed,
    confirmedPer,
    cured,
    curedPer,
    ...rest
}: CovidStatResponse<number>): CovidStatResponse<string> => ({
    vaccinated: numberFormat(vaccinated),
    vaccinatedPer: numberFormat(vaccinatedPer),
    confirmed: numberFormat(confirmed),
    confirmedPer: numberFormat(confirmedPer),
    cured: numberFormat(cured),
    curedPer: numberFormat(curedPer),
    ...rest,
})

const routes = async (req: NextApiRequest, res: NextApiResponse<Response<CovidStatResponse<string>>>) => {
    try {
        const {
            data: {data},
        }: AxiosResponse<ServerResponse<CovidStatResponse<number>>> = await axios.get(`${API_URL_BASE}/covidstat`, {
            headers: req.headers,
        })

        const result = parseToNumber(data)

        res.status(200).json(createResponse<CovidStatResponse<string>>(result))
        return
    } catch {
        res.status(200).json(
            createResponse<CovidStatResponse<string>>({
                date: '2021-08-23',
                vaccinated: '11,112,222', // 2차 접종 완료자 수   <-- 접종 완료율로 변경 필요!!
                vaccinatedPer: '22,222', // 2차 접종 완료자 수 (전일대비 증감량) <-- 접종 완료율로 변경 필요!!
                confirmed: '111,111', // 확진자수
                confirmedPer: '1,112', // 확진자수 (전일대비 증감량)
                cured: '222,222', // 완치자수
                curedPer: '2,222', // 완치자수 (전일대비 증감량)
                lettersSend: 11, // 발송된 편지
                lettersPending: 2, // 미발송 편지수
            }),
        )
    }
}

module.exports = routes
