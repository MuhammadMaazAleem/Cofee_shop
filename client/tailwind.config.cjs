/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          brown: '#6F4E37',
          cream: '#F5E6D3',
          espresso: '#3E2723', // Dark Espresso
        },
        secondary: {
          caramel: '#C68642',
          latte: '#FDFAF6', // Latte Foam
          grey: '#E0E0E0', // Steam Grey
        },
        accent: {
          gold: '#D4AF37',
          mocha: '#4A2C2A', // Rich Mocha
          mint: '#98D8C8', // Fresh Mint
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
