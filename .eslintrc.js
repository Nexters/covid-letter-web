module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'next',
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'no-var': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-handler-names': [
            'error',
            {
                checkLocalVariables: true,
                checkInlineFunction: true,
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
}
