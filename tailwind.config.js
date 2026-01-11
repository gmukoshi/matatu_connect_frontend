/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      /* =========================
         COLORS — GREEN ONLY
      ========================= */
      colors: {
        primary: {
          DEFAULT: "#22C55E", // main green
          hover: "#16A34A",
          light: "#4ADE80",
        },

        /* BACKGROUNDS */
        background: "#0B0F0E",
        surface: "#111716",
        "surface-dark": "#0D1211",

        /* TEXT */
        text: {
          main: "#E5E7EB",
          muted: "#9CA3AF",
          inverse: "#000000",
        },

        /* STATUS */
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },

      /* =========================
         TYPOGRAPHY
      ========================= */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      /* =========================
         EFFECTS
      ========================= */
      boxShadow: {
        glow: "0 0 20px rgba(34, 197, 94, 0.35)",
      },
    },
  },

  plugins: [],
};
