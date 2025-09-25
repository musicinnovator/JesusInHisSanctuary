/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sanctuary-blue': '#4169E1',
        'sanctuary-blue-dark': '#1e3a8a',
        'sanctuary-purple': '#800080',
        'sanctuary-purple-dark': '#581c87',
        'sanctuary-gold': '#FFD700',
        'sanctuary-gold-dark': '#b45309',
        'sanctuary-brass': '#B5651D',
        'sanctuary-silver': '#C0C0C0',
        'sanctuary-silver-dark': '#9ca3af',
        'sanctuary-scarlet': '#DC143C',
        'sanctuary-linen': '#FAF0E6',
        'sanctuary-linen-dark': '#f3e8d3',
      },
    },
  },
  plugins: [],
}