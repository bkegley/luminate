const colors = require('tailwindcss/colors');
const production = process.env.NODE_ENV === 'production';

module.exports = {
  purge: {
    enabled: production,
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
  },
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
  variants: {
    extend: {
      backgroundColor: ['checked'],
      textColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
