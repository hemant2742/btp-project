// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}"],
  variants: {
    extend: {},
  },
  plugins: [],
};
