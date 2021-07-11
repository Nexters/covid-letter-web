/* eslint-disable @typescript-eslint/no-var-requires */
const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.json')

module.exports = {
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>src'],
    setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        ...pathsToModuleNameMapper(compilerOptions.paths),
    },
    testEnvironment: 'jsdom',
}
