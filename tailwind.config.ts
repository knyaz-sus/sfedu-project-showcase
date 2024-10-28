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
        highlight: "var(--color-highlight-background)",
      },
      textColor: {
        base: "var(--color-base-content)",
        highlight: "var(--color-highlight-content)",
        header: "var(--color-header)",
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
