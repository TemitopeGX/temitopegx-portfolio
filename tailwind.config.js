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
          primary: "#3B82F6", // Blue-500
          secondary: "#8B5CF6", // Purple-500
          dark: "#1F2937", // Gray-800
          light: "#F3F4F6", // Gray-100
        },
        oasis: {
          primary: "#10B981", // Emerald-500
          secondary: "#3B82F6", // Blue-500
          accent: "#F59E0B", // Amber-500
          dark: "#1F2937",
        },
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "bounce-medium": "bounce 2.5s infinite",
        "bounce-fast": "bounce 2s infinite",
        "fade-in": "fadeIn 1s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
