import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_HOST = env.VITE_API_HOST || "localhost";
  const API_PORT = env.VITE_API_PORT || "8000";
  const API_URL = `http://${API_HOST}:${API_PORT}`;
  const API_ARCHIVE_URL = env.VITE_API_ARCHIVE_URL || "localhost";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      allowedHosts: ["dev1.karera.live", "staging.karera.live"],
      host: true,
      port: 3000,
      watch: {
        usePolling: true,
        interval: 100,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/archive": {
          target: API_ARCHIVE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/archive/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
