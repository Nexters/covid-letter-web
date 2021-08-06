module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'ohsquare-air': ['Cafe24 Ohsquare air', 'Arial', 'sans-serif'],
                ohsquare: ['Cafe24 Ohsquare', 'Arial', 'sans-serif'],
                nanumBarunGothic: ['NanumBarunGothic', 'Arial', 'sans-serif'],
            },
        },
        /**
         * @todo 추가해야 할 거
         * - iconSize (width?)
         * - spacing // If you’d like to customize these values for padding, margin, width, and height all at once
         */
        fontSize: {
            '3xs': ['0.9rem', '1.4rem'],
            '2xs': ['1rem', '1.6rem'],
            xs: ['1.2rem', '1.9rem'],
            sm: ['1.4rem', '2.2rem'],
            base: ['1.6rem', '2.5rem'],
            lg: ['1.8rem', '2.5rem'],
            xl: ['2rem', '3.2rem'],
            '2xl': ['2.2rem', '3.5rem'], // first: font-size, second: line-height
            '3xl': ['2.4rem', '3.9rem'],
            '4xl': ['2.6rem', '4.2rem'],
            '5xl': ['2.8rem', '4.5rem'],
        },
        colors: {
            'primary-green': {
                600: 'var(--primary-green-600)',
                500: 'var(--primary-green-500)',
                400: 'var(--primary-green-400)',
                300: 'var(--primary-green-300)',
            },
            'primary-yellow': {
                600: 'var(--primary-yellow-600)',
                500: 'var(--primary-yellow-500)',
                400: 'var(--primary-yellow-400)',
                300: 'var(--primary-yellow-300)',
            },
            beige: {
                600: 'var(--beige-600)',
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
            blue: {
                500: 'var(--blue-500)',
            },
            red: {
                500: 'var(--red-500)',
            },
            green: {
                500: 'var(--green-500)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    prefix: 'tw-',
}
