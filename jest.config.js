/* eslint-disable @typescript-eslint/no-var-requires */
const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.json')
/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>src'],
    setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
    testPathIgnorePatterns: ['/.next', '/node_modules/', '/config/'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        ...pathsToModuleNameMapper(compilerOptions.paths),
    },
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
}
