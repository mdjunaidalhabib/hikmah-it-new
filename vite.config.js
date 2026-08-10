import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getBackendPort() {
  try {
    const envContent = fs.readFileSync(path.resolve(__dirname, "server/.env"), "utf-8");
    const match = envContent.match(/^PORT=(\d+)/m);
    if (match) return match[1];
  } catch {
    // server/.env not found — fall back to default
  }
  return "5000";
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");

  const backendPort = getBackendPort();
  const backendTarget = `http://localhost:${backendPort}`;
  const frontendPort = Number(env.FRONTEND_PORT) || 3000;

  const allowedHosts = env.VITE_ALLOWED_HOST
    ? env.VITE_ALLOWED_HOST.split(",").map((host) => host.trim())
    : [];

  return {
    plugins: [react()],

    server: {
      host: "0.0.0.0",
      port: frontendPort,
      proxy: {
        "/api": { target: backendTarget, changeOrigin: true },
        "/uploads": { target: backendTarget, changeOrigin: true },
      },
    },

    preview: {
      host: "0.0.0.0",
      port: frontendPort,
      allowedHosts,
      proxy: {
        "/api": { target: backendTarget, changeOrigin: true },
        "/uploads": { target: backendTarget, changeOrigin: true },
      },
    },
  };
});
