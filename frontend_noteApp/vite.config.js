import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/notes": {
  //       target: "http://localhost:5173",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
