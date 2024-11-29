// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        rotate4: {
          "100%": { transform: "rotate(360deg)" },
        },
        dash4: {
          "0%": {
            "stroke-dasharray": "1, 200",
            "stroke-dashoffset": "0",
          },
          "50%": {
            "stroke-dasharray": "90, 200",
            "stroke-dashoffset": "-35px",
          },
          "100%": {
            "stroke-dashoffset": "-125px",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        rotate4: "rotate4 2s linear infinite",
        dash4: "dash4 1.5s ease-in-out infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
