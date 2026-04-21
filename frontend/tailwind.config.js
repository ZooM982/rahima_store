/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4D8D",
        "primary-dark": "#E91E63",
        secondary: "#B76E79",
        accent: "#FFD1DC",
        "bg-soft": "#FFF9FB",
        "text-main": "#2D3436",
        "text-muted": "#636E72",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Outfit", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeInUp 0.8s ease forwards",
        "fade": "fadeIn 1s ease forwards",
        "scale": "scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
