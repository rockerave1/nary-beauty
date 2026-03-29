/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#faf5ef",
          100: "#f5ebe0",
          200: "#e8ddd0",
          300: "#d4c4b0",
          400: "#b8a08a",
          500: "#8a7d70",
          600: "#6b5e52",
          700: "#6f4e2c",
          800: "#4a3520",
          900: "#2c1810",
          950: "#1a1411",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Karla", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
