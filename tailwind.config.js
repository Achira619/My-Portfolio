/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          green:  "#00ff41",
          green2: "#00cc33",
          dim:    "#007a1f",
          bg:     "#050a05",
          bg2:    "#070d07",
          bg3:    "#0a140a",
        },
        cyan:  "#00e5ff",
        amber: "#ffb800",
        red:   "#ff4444",
      },
      fontFamily: {
        mono:  ["var(--font-mono)", "monospace"],
        sans:  ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
