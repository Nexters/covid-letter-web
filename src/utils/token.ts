import randomString from 'randomstring'

export const generateToken = () => {
    return encodeURIComponent(randomString.generate())
}
