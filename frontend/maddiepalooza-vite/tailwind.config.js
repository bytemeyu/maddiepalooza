/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'honk': ['Honk', 'sans-serif'],
        'anton-sc-regular': ['Anton SC', 'sans-serif'],
        'beiruti-english': ['Beiruti', 'sans-serif'],
      },
    }
  },
  plugins: []
}
