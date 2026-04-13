tailwind.config = {
    theme: {
        extend: {
            colors: {
                beige: {
                    50: '#faf8f5',
                    100: '#f5f1ea',
                    200: '#e6dccd',
                    300: '#d6c4ad',
                    400: '#c4ab8d',
                    500: '#b59370',
                    600: '#9b7a5a',
                    700: '#7a5f47',
                    800: '#5c4736',
                    900: '#3f3125'
                }
            },
            boxShadow: {
                soft: '0 20px 50px rgba(92, 71, 54, 0.12)'
            },
            fontFamily: {
                sans: ['Segoe UI', 'sans-serif']
            },
            keyframes: {
                modalIn: {
                    '0%': { opacity: '0', transform: 'translateY(18px) scale(0.96)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
                },
                modalOut: {
                    '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                    '100%': { opacity: '0', transform: 'translateY(18px) scale(0.96)' }
                },
                backdropIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                backdropOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' }
                }
            },
            animation: {
                modalIn: 'modalIn 0.28s ease forwards',
                modalOut: 'modalOut 0.22s ease forwards',
                backdropIn: 'backdropIn 0.22s ease forwards',
                backdropOut: 'backdropOut 0.2s ease forwards'
            }
        }
    }
};
