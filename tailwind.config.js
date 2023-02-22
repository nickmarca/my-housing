const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-montserrat)', ...defaultTheme.fontFamily.serif],
      },
      boxShadow: {
        full: '0 0 0 100vmax rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
};
