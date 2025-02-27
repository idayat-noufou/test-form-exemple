import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {codecovVitePlugin} from "@codecov/vite-plugin";

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
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./vitest.setup.js",
        coverage: {
            provider: "v8",
            include: ["src/**/*.{js,jsx,ts,tsx}"],
            exclude: ["src/App.js","src/setupTests.js", "src/main.jsx", "src/index.js"],
            reporter: ["text", "json", "html"],
        },
    },
    base: "/test-form-exemple/",
})