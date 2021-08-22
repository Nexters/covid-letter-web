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
    const {
        data: {data},
    }: AxiosResponse<ServerResponse<CovidStatResponse<number>>> = await axios.get(`${API_URL_BASE}/covidstat`, {
        headers: req.headers,
    })

    const result = parseToNumber(data)

    res.status(200).json(createResponse<CovidStatResponse<string>>(result))
    return
}

module.exports = routes
