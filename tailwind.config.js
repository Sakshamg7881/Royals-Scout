/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rr: {
          pink: '#EA1B86',
          'pink-hover': '#D01575',
          'pink-light': '#FCE7F3',
          'pink-glow': 'rgba(234, 27, 134, 0.25)',
          navy: '#001D48',
          'navy-dark': '#00122E',
          'navy-light': '#0A2D6C',
          card: '#081F4D',
          'card-hover': '#0C2B6B',
          accent: '#2563EB',
          gold: '#FFB800',
          silver: '#94A3B8',
          surface: '#051433'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

