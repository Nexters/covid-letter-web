export type AuthStoreState = {
    isLogined: boolean
    loginUser: () => void
    clearUser: () => void
}

const createAuthStore = (): AuthStoreState => {
    return {
        isLogined: false,
        loginUser() {
            this.isLogined = true
        },
        clearUser() {
            this.isLogined = false
        },
    }
}

export {createAuthStore}
