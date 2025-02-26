import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Get the backend URL from environment variables
const backendUrl = process.env.VITE_BACKEND_URL || "https://your-backend.vercel.app";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  base: "./", // Ensures correct asset loading
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
