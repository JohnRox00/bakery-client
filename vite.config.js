/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: [/^node_modules*/],
    },
  },
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       // target: "http://localhost:5000",
  //       target: "https://bakery-management-api.onrender.com/",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
