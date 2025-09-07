/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sanctuary: {
          gold: '#FFD700',
          'gold-dark': '#B8860B',
          silver: '#C0C0C0',
          'silver-dark': '#A9A9A9',
          brass: '#CD7F32',
          'brass-dark': '#B87333',
          blue: '#4169E1',
          'blue-dark': '#191970',
          purple: '#800080',
          'purple-dark': '#4B0082',
          scarlet: '#DC143C',
          'scarlet-dark': '#B22222',
          linen: '#FAF0E6',
          'linen-dark': '#F5DEB3'
        }
      }
    },
  },
  plugins: [],
};
