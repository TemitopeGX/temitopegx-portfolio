/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        temitope: {
          primary: '#3B82F6',   // Blue-500
          secondary: '#8B5CF6', // Purple-500
          dark: '#1F2937',      // Gray-800
          light: '#F3F4F6',     // Gray-100
        },
        oasis: {
          primary: '#10B981',   // Emerald-500
          secondary: '#3B82F6',  // Blue-500
          accent: '#F59E0B',    // Amber-500
          dark: '#1F2937',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
} 