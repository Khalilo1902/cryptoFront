/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    container:{
      center:true
    },
    

    fontFamily: {
      FONT_VIGA: ["Viga", "sans-serif"],
      FONT_ROBOTO: ["Roboto", "sans-serif"],
      FONT_SALSA: ["Salsa", "cursive"],
      ANTON: ["Anton", "sans-serif"],
    },
    extend: {
      colors: {
        PRIMARY_BLACK:"#202020",
        SECONDARY_BLACK: "#191919",
        BLACK:"#000000",
        PRIMARY_WHITE: "#f0f3f5",
        SECONDARY_WHITE:"#ffffff",
        PRIMARY_BLUE:"#0284c7",
        SECONDARY_BLUE:"#22d3ee",
        DARK_BLUE:"#172554",
        LIGHT_BLUE:"#eff6ff",
        PRIMARY_ORANGE:"#ee8425",
        SECONDARY_ORANGE: "#fdba74",
        PRIMARY_RED:"#dc2626",
        SECONDARY_RED: "#ef4444",
        PRIMARY_GRAY:"#737373",
        SECONDARY_GRAY: "#a3a3a3",
        SECONDARY_GREEN: "#22c55e",
        LIGHT_GRAY:"#e5e7eb",
        DARK_GRAY:"#d1d5db",
        SECONDARY_TOW_GRAY:"#fbfbfd",
        DARK_SLATE:"#0f172a"
      },
    },

  },
  plugins: [],
}