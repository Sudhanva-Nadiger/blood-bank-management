/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3f497f'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

