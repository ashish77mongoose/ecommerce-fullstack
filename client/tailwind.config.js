/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gabrito: ["Gabarito", "cursive"],
      },
      colors: {
        primary: {
          blue: "#06b6d4",
        },
      },
      boxShadow: {
        card: "shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]",
        navbar: "shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [],
};
