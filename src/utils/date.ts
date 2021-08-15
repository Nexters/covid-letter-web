import {format} from 'date-fns'

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
