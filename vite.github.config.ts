/**
 * Vite config for building a static SPA for GitHub Pages.
 *
 * Usage:  bun run build:github
 * Output: dist/  (deploy this folder to GitHub Pages)
 *
 * NOTE: If your GitHub Pages URL is username.github.io/repo-name/,
 * uncomment the `base` line below and set it to "/repo-name/".
 * If using a custom domain (e.g. vibefactory.io), leave base as "/".
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  // base: "/repo-name/",  // ← uncomment & set if NOT using a custom domain
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
