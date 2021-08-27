export const noop = () => {}

export const numberFormat = (number: number) => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g
    return number.toString().replace(regexp, ',')
}

export const pad1Digits = (number: number) => number.toFixed(1)
