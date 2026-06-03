import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1F4D3A",
          gold: "#D4A017",
          dark: "#121212",
          white: "#F8F8F6",
          text: "#2B2B2B",
          "light-gray": "#F0F0EE",
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero-desktop": ["64px", { lineHeight: "1.1", fontWeight: "900" }],
        "hero-tablet": ["42px", { lineHeight: "1.15" }],
        "hero-mobile": ["32px", { lineHeight: "1.2" }],
        "section-desktop": ["40px", { lineHeight: "1.2" }],
        "section-tablet": ["30px", { lineHeight: "1.25" }],
        "section-mobile": ["26px", { lineHeight: "1.3" }],
      },
      spacing: {
        "section-desktop": "120px",
        "section-tablet": "80px",
        "section-mobile": "60px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.08)",
        medium: "0 4px 16px rgba(0,0,0,0.12)",
        large: "0 8px 32px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "count-up": "countUp 1.5s ease-out forwards",
        pulse: "pulse 1.5s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
