/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F2EFE9",
        "canvas-muted": "#E7E3DA",
        "canvas-deep": "#DDD8CE",
        ink: "#111111",
        "ink-soft": "#2A2927",
        cobalt: "#1D4ED8",
        "cobalt-light": "#3B82F6",
        stone: "#8A857C",
        "stone-light": "#A8A39A",
        "stone-dark": "#5C5850",
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "Anton", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "Plus Jakarta Sans", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.15em",
        micro: "0.12em",
      },
      lineHeight: {
        compressed: "0.92",
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(17, 17, 17, 0.08)",
        "tactile-sm": "0 2px 0 #111111",
        tactile: "4px 4px 0 #111111",
        "tactile-lg": "8px 8px 0 #111111",
        "cobalt-pop": "4px 4px 0 #1D4ED8",
      },
    },
  },
  plugins: [],
};
