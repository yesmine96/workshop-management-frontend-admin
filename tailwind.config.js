const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'

  theme: {
    screens: {
      '3xl': { max: '1536px' },
      '2xl': { max: '1366px' },

      xl: { max: '1279px' },

      lg: { max: '1023px' },

      md: { max: '767px' },

      sm: { max: '639px' },
    },
    fontFamily: {
      Atkinson: ['Atkinson Hyperlegible', 'sans-serif'],
      Calibre: ['Calibre'],
    },
    colors: {
      ...colors,
      gray: {
        DEFAULT: '#818181',
        100: '#C2C2C2',
        200: '#FAFAFA',
      },

      orange: {
        DEFAULT: '#E56E1B',
      },
      purple: {
        DEFAULT: '#C0AFE0',
        200: '#6237B2',
      },
    },
    extend: {
      dropShadow: {
        sm: '0px 2px 2px rgba(0, 0, 0, 0.25)',
        md: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        lg: ' 1px 1px 8px 0.5px rgba(0, 0, 0, 0.25)',
        xl: '0px 5px 11px -2px rgba(0, 0, 0, 0.16)',
      },
      boxShadow: {
        sm: '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
        dropdown: '1px 1px 8px 0.5px rgba(0, 0, 0, 0.16)',
        dropdown_2: '0px 5px 11px -2px rgba(0, 0, 0, 0.16)',
        hovered:
          'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
      },
      borderRadius: {
        DEFAULT: '5px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
