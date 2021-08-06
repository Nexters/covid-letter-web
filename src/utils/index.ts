export const noop = () => {}

export const numberFormat = (number: number) => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g
    return number.toString().replace(regexp, ',')
}
