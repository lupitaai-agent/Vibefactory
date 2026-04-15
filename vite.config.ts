// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { resolve } from "path";
import { readFileSync, existsSync } from "fs";

// Plugin to serve static HTML articles before SSR catches them
function serveArticlesPlugin() {
  return {
    name: "serve-articles",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith("/articles/") && req.url.endsWith(".html")) {
          const cleanPath = req.url.split("?")[0];
          const filePath = resolve("public", cleanPath.slice(1));
          if (existsSync(filePath)) {
            res.setHeader("Content-Type", "text/html");
            res.end(readFileSync(filePath, "utf-8"));
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [serveArticlesPlugin()],
  },
});
