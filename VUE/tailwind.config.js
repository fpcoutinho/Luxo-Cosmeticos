/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fff1f2',
          200: '#fda4af',
          300: '#fb7185',
          400: '#f43f5e',
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239',
          800: '#881337',
          900: '#4c0519',
        },
        secondary: {
          100: '#fafaf9',
          200: '#f5f5f4',
          300: '#e7e5e4',
          400: '#d6d3d1',
          500: '#a8a29e',
          600: '#78716c',
          700: '#57534e',
          800: '#44403c',
          900: '#292524',
        },
      },
    },
    fontFamily: {
      Inter: ['Inter', 'sans-serif'],
    },
    container: {
      padding: '2rem',
      center: true,
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
