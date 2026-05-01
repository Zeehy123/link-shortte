/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "#d884c2",
          secondary: "#616b87",
          card: "#0f6668",
          hover: "#8792a7",
        },
        accent: "#00d4ff",
        purple: "#a855f7",
        border: "rgba(255,255,255,0.07)",
        muted: "#3d4f67",
        ink: "#8fa3be",
        snow: "#e8edf5",
      },
      boxShadow: {
        glow: "0 0 24px rgba(0, 212, 255, 0.15)",
        purple: "0 0 24px rgba(168, 85, 247, 0.15)",
      },
    },
  },
  plugins: [],
};
