/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ee4723",
          pale: "#e34354",
        },
        gray: "#aaaaaa",
        "dark-gray": "#7d7d7d",
        "darker-gray": "#313131",
        dark: "#131313",
      },
      fontFamily: {
        made: ["MADE Outer Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
