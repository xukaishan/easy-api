// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
    build: {
        target: 'es2015',
        lib: {
            entry: resolve(__dirname, '../packages/index.js'),
            name: 'easyapi',
        },
        terserOptions: {

        },
        rollupOptions: {
            external: ['axios', 'qs'],
            output: {
                globals: {
                    axios: 'axios',
                    qs: 'Qs',
                },
            },
            plugins: [
                terser({
                    ecma: 5,
                }),
            ],
        },
    },
})
