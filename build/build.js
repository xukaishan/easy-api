// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, '../packages/index.js'),
            name: 'easyapi',
            fileName: (format) => `easyapi.${format}.js`,
        },
        rollupOptions: {
            external: ['axios', 'qs'],
            output: {
                globals: {
                    axios: 'axios',
                },
            },
        },
    },
})