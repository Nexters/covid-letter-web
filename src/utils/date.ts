/**
 * @param dateString
 * @return string YYYY.MM.DD
 */
export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate();

    return `${date.getFullYear()}.${month > 10 ? month : `0${month}`}.${day > 10 ? day : `0${day}`}`
}
