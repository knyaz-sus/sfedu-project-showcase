import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      backgroundColor: {
        base: "var(--color-base-background)",
        button: "var(--color-button-background)",
        leftbar: "var(--color-left-bar-background)",
        transparent: "var(--color-transparent)",
      },
      textColor: {
        base: "var(--color-base-content)",
        highlight: "var(--color-highlight-content)",
        button: "var(--color-button-text)",
      },
      borderColor: {
        highlight: "var(--color-highlight-border)",
        base: "var(--color-base-border)",
      },
    },
  },
  plugins: [],
};
export default config;
