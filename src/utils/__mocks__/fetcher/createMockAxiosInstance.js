export const createMockAxiosInstance = (target) => ({
    target,
    async request(...args) {
        return this.target && (await this.target.request(...args))
    },
})

const mockAxiosInstance = createMockAxiosInstance(null)

export default mockAxiosInstance
