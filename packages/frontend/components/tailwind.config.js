const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.yellow,
        gray: colors.blueGray,
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
};
