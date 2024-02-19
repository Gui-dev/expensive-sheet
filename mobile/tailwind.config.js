/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'xs-black': '#000',
        'xs-red': '#FF647C',
        'xs-green': '#0BD9B3',
        'xs-blue': '#487FD9',
        'xs-yellow': '#EBC455',
        'xs-raisin-black': '#16171C',
      },
    },
  },
  plugins: [],
}
