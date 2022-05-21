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
          "accent": "#6366f1",
          "neutral": "#292524",
          "base-100": "#FFFFFF",
          "info": "#38bdf8",
          "success": "#4ade80",
          "warning": "#4b5563",
          "error": "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}