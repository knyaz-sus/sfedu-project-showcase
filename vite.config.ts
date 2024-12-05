import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 5173,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    origin: "http://0.0.0.0:5173",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    mockReset: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
