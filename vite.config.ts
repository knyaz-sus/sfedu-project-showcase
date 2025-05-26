import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer(),
    react({
      babel: { plugins: [["babel-plugin-react-compiler"]] },
    }),
  ],
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router-dom") ||
            id.includes("@radix-ui")
          ) {
            return "core";
          }

          if (id.includes("@tiptap")) {
            return "tiptap";
          }
          if (id.includes("xlsx")) {
            return "xlsx";
          }
          if (id.includes("zod")) {
            return "zod";
          }
          if (id.includes("embla-carousel")) {
            return "embla-carousel";
          }

          return "vendor";
        },
      },
    },
  },
  preview: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
