/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Academic Design System
        'sanctuary-navy': '#1C2A39',
        'sanctuary-gold': '#8C6B3C',
        'sanctuary-gold-light': '#BFA76A',
        'sanctuary-background': '#F7F7F5',
        'sanctuary-surface': '#FFFFFF',
        'text-primary': '#222222',
        'text-secondary': '#4A4A4A',
        'text-tertiary': '#6B6B6B',
        'divider': '#E5E5E5',
        'success': '#2D5A3D',
        'warning': '#8C6B3C',
        'error': '#8B3A3A',
        'info': '#2A4A5C',
      },
      fontFamily: {
        'heading': ['Cinzel', 'Palatino', 'Georgia', 'serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'scripture': ['Crimson Text', 'Georgia', 'serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      spacing: {
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
        '7': '64px',
        '8': '80px',
        '9': '96px',
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1200px',
        'container-2xl': '1400px',
      },
      screens: {
        'mobile': '0px',
        'tablet': '641px',
        'desktop': '1025px',
      },
    },
  },
  plugins: [],
}