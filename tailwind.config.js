/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        adventure: {
          orange: "#FF8C42",
          "orange-light": "#FFA96B",
          "orange-dark": "#E67A30",
          blue: "#1B2A4A",
          "blue-light": "#2D4270",
          "blue-dark": "#0F1A30",
          cream: "#FFF8F0",
          "cream-dark": "#F5EDE0",
          pink: "#FFB5C2",
          "pink-light": "#FFD0DA",
          teal: "#4ECDC4",
          "teal-light": "#7EDDD6",
          gold: "#FFD93D",
          "gold-light": "#FFE570",
        },
      },
      fontFamily: {
        display: ["ZCOOL KuaiLe", "cursive"],
        body: ["Noto Sans SC", "sans-serif"],
      },
      borderRadius: {
        adventure: "16px",
        "adventure-lg": "24px",
      },
      boxShadow: {
        adventure: "0 4px 14px rgba(255, 140, 66, 0.3)",
        "adventure-lg": "0 8px 24px rgba(255, 140, 66, 0.4)",
        "adventure-inner": "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        card: "0 2px 12px rgba(27, 42, 74, 0.08)",
        "card-hover": "0 8px 24px rgba(27, 42, 74, 0.15)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(255, 140, 66, 0.4)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 140, 66, 0.8)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
