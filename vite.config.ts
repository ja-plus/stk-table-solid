import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solid()],
    build: {
        outDir: 'lib',
        lib: {
            entry: './src/StkTable/index.ts',
            fileName: 'stk-table-solid',
            formats: ['es'],
            cssFileName: 'style',
        },
        rollupOptions: {
            external: [/^solid-js/],
        },
    },
    server: {
        port: 5173,
        open: false,
    },
});
