/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{html,liquid,js}",
    "./src/theme/assets/**/*.{html,liquid,js}",
    "./src/theme/config/**/*.{html,liquid,js}",
    "./src/theme/layout/**/*.{html,liquid,js}",
    "./src/theme/sections/**/*.{html,liquid,js}",
    "./src/theme/snippets/**/*.{html,liquid,js}",
    "./src/theme/templates/**/*.{html,liquid,js}",
    "./src/react/**/*.{tsx,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
