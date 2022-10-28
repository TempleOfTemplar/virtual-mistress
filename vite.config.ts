import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import mkcert from'vite-plugin-mkcert'
import react from '@vitejs/plugin-react';

export default defineConfig({
    // server: {
    //     https: true,
    //     port: 8000,
    //     // host: '127.0.0.1',
    //     // hmr: {
    //     //     host: '127.0.0.1',
    //     //     port: 443,
    //     //     protocol: 'wss'
    //     // }
    // },
    css: {
        modules: {
            localsConvention: 'dashes'
        },
    },
    plugins: [
        mkcert(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        react(),
    ],
});
