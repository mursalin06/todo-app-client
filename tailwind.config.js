/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Minimalistic Color Palette
        lightBackground: '#FFFFFF',    // Clean white for light mode
        darkBackground: '#121212',     // Dark background for dark mode
        lightText: '#333333',          // Dark text for light mode
        darkText: '#E0E0E0',           // Light text for dark mode
        primary: '#3B82F6',            // A modern blue as primary
        secondary: '#10B981',          // A fresh teal as secondary
        darkCardBackground: '#1F2937', // Dark card background for dark mode
      },
    },
  },
  plugins: [require('daisyui')],
  darkMode: 'class', // Enable dark mode based on a class
};
