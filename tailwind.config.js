/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#04090e',
        surface: 'rgba(255, 255, 255, 0.03)',
        border: 'rgba(255, 255, 255, 0.1)',
        primary: '#3b82f6', // blue-500
        accent: '#00ffcc', // neon cyan
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
