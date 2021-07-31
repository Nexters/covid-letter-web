module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        /**
         * @todo 추가해야 할 거
         * - fontSize
         * - iconSize (width?)
         * - spacing // If you’d like to customize these values for padding, margin, width, and height all at once
         */
        // fontSize: {
        //     xs: ['.75rem'],
        //     sm: ['.875rem'],
        //     base: ['1rem'],
        //     lg: ['1.8rem'],
        //     xl: ['2rem'],
        //     '2xl': ['2.2rem', '3.5rem'],
        // },
        colors: {
            'primary-green': {
                800: 'var(--primary-green-800)',
                700: 'var(--primary-green-700)',
                600: 'var(--primary-green-600)',
            },
            'primary-yellow': {
                800: 'var(--primary-yellow-800)',
            },
            beige: {
                500: 'var(--beige-500)',
                400: 'var(--beige-400)',
                300: 'var(--beige-300)',
                200: 'var(--beige-200)',
            },
            grey: {
                800: 'var(--grey-800)',
                700: 'var(--grey-700)',
                600: 'var(--grey-600)',
                500: 'var(--grey-500)',
                400: 'var(--grey-400)',
                300: 'var(--grey-300)',
                200: 'var(--grey-200)',
                100: 'var(--grey-100)',
                '000': 'var(--grey-000)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    prefix: 'tw-',
}
