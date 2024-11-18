import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { codecovVitePlugin } from "@codecov/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: "test-form-exemple",
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  base: "/test-form-exemple/",
})