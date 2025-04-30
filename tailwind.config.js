/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
      colors: {
        'capy-brown': '#8B4513',
        'capy-light': '#D2B48C',
        'capy-dark': '#3A3238',
        'capy-dark-accent': '#594E52',
      }
    },
  },
  plugins: [],
}