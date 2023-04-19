import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: [
            {
                find: 'easy-api',
                replacement: resolve(__dirname, '../'),
            },
        ],
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [vue()],
})
