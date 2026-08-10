import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const allowedHosts = process.env.VITE_ALLOWED_HOST
  ? process.env.VITE_ALLOWED_HOST.split(",").map((host) => host.trim())
  : [];

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": { target: "http://localhost:5000", changeOrigin: true },
      "/uploads": { target: "http://localhost:5000", changeOrigin: true },
    },
  },

  preview: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts,
    proxy: {
      "/api": { target: "http://localhost:5000", changeOrigin: true },
      "/uploads": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
});
