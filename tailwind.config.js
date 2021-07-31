module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            'primary-green': {
                800: '#11373E',
                700: '#5E7C75',
                600: '#818D8A',
            },
            'primary-yellow': {
                800: '#11373E',
            },
            beige: {
                300: 'var(--beige-300)',
                200: 'var(--beige-200)',
            },
            grey: {
                800: '#22211F',
                700: '#5F5D59',
                600: '#807C76',
                500: '#ADAAA5',
                400: '#BBBBBB',
                300: '#DFDFDF',
                200: '#EFEFEF',
                100: '#F8F8F8',
                '000': '#ffffff',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    prefix: 'tw-',
}
