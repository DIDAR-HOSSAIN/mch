import {
    defineConfig
} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: [{
                paths: ['https://app.medicalcentrebd.com/'],
                config: {
                    delay: 300,
                },
            }],
        }),
        react(),
    ],
    server: {
        host: 'localhost',
        port: 5173,
    },
});

// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: 'resources/js/app.jsx',
//             refresh: [{
//                 paths: ['http://localhost:8000/'],
//                 config: {
//                     delay: 300,
//                 },
//             }],
//         }),
//         react(),
//     ],
//     server: {
//         host: 'localhost',
//         port: 5173,
//     },
// });
