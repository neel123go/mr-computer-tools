module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a5b4fc",
          "secondary": "#f43f5e",
          "accent": "#fcd34d",
          "neutral": "#292524",
          "base-100": "#FFFFFF",
          "info": "#38bdf8",
          "success": "#4ade80",
          "warning": "#8b5cf6",
          "error": "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}