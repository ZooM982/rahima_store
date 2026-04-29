/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E8AA18",
        "primary-dark": "#F5C219",
        secondary: "#F9F093",
        accent: "#FDF07F",
        "bg-soft": "#080808",
        "text-main": "#FFFFFF",
        "text-muted": "#A0A0A0",
        gold: {
          0: "#E8AA18",
          32: "#F5C219",
          68: "#F9F093",
          100: "#FDF07F",
        }
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
