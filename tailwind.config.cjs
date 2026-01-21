/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050816',
        surface: '#0b1020',
        accent: {
          DEFAULT: '#22d3ee',
          soft: '#38bdf8',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 40px rgba(15,23,42,0.8)',
      },
    },
  },
  plugins: [],
};


