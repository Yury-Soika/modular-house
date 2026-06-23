import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f3f7f1",
          100: "#e5eee1",
          300: "#a9bd9c",
          500: "#5d7b48",
          700: "#31452c",
          900: "#172723",
          950: "#0d1815"
        },
        linen: "#f4efe7",
        sand: "#d8c5a9",
        timber: "#a58e73",
        charcoal: "#1d2523"
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(13, 24, 21, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
