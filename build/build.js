import { resolve } from 'path'
import { defineConfig } from 'vite'
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

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
                babel({
                    exclude: '**/node_modules/**',
                }),
                terser({
                    ecma: 5,
                }),
            ],
        },
    },
})
