import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F1012",
        "ink-soft": "#1A1C1F",
        bone: "#F6F2EA",
        paper: "#FFFFFF",
        gold: "#C49A48",
        "gold-deep": "#A87E33",
        sand: "#E7DCC8",
        slate: "#6B6F76",
        success: "#2F7D5A",
        error: "#C0392B",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ['"Fraunces Variable"', "Fraunces", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 8vw, 6rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2" }],
        "body-l": ["1.125rem", { lineHeight: "1.7" }],
        body: ["1rem", { lineHeight: "1.65" }],
        label: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
      },
      maxWidth: {
        container: "1280px",
        prose: "66ch",
      },
      borderColor: {
        line: "rgba(15,16,18,0.10)",
        "line-dark": "rgba(255,255,255,0.12)",
      },
      borderRadius: {
        btn: "12px",
        card: "16px",
        input: "10px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.05)",
        lift: "0 10px 30px rgba(0,0,0,0.07)",
        "lift-strong": "0 16px 44px rgba(0,0,0,0.16)",
      },
      spacing: {
        section: "clamp(72px, 10vw, 160px)",
        "section-sm": "clamp(56px, 12vw, 96px)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
