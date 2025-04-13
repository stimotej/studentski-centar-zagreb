/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1ca5ff",
        "primary-light": "#3cd1ff",
        sc: "#0075b2",
        text: "#333333",
        light: "#666666",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "slide-in": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
