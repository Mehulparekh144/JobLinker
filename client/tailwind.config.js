const { nextui } = require("@nextui-org/react")
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'primary': ['DM Sans', 'sans- serif'],
      'secondary': ['Josefin Sans']
    },
    colors: {
      'main': '#181716',
      'second': '#fdc500',
      'background': '#F5F5F5',
      transparent: 'transparent',
      red: colors.rose,
      slate: colors.slate,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
}
