import {TIME_UNIT} from '$constants/index'
import {format, addDays, parse, intervalToDuration} from 'date-fns'

/**
 * @param dateString
 * @return string yyyy.MM.dd
 */
export const convertCommonDateFormat = (dateString: string) => {
    return format(new Date(dateString), 'yyyy.MM.dd')
}

export const getCurrentDate = () => {
    return format(new Date(), 'yyyy.MM.dd')
}

export const getIntervalFromTodayToNextday = () => {
    const expiredTime = addDays(parse(format(new Date(), 'yyyy-MM-dd'), 'yyyy-MM-dd', new Date()), 1)

    const {
        hours = 0,
        minutes = 0,
        seconds = 0,
    } = intervalToDuration({
        start: new Date(),
        end: expiredTime,
    })

    return seconds + minutes * TIME_UNIT.MINUTE + hours * TIME_UNIT.HOUR
}
