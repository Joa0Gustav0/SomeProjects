/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      main: "#155E75",
      subMain: "#98B9C3",
      txt: "#172554",
      txtLessOpacity: "#515C7F",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "#FFFFFF00",
    },
    fontFamily: {
      DMSerifDisplay: "DM Serif Display",
      DMSans: "DM Sans",
      Ephesis: "Ephesis",
    },
    screens: {
      xxsm: "450px", 
      xsm: "550px",
      sm: "650px",
      md: "720px",
      lg: "900px",
      mlg: "950px",
      xl: "1050px",
      mx: "1100px",
    },
  },
  plugins: [],
};
