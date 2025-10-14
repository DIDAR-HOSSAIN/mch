// import {
//     defineConfig
// } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: 'resources/js/app.jsx',
//             refresh: [{
//                 paths: ['https://app.medicalcentrebd.com/'],
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


// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: 'resources/js/app.jsx',
//             refresh: true,
//         }),
//         react(),
//     ],
//     server: {
//         host: '0.0.0.0', // ✅ সব জায়গা থেকে অ্যাক্সেসযোগ্য
//         port: 5173,
//         strictPort: true,
//         cors: {
//             origin: [
//                 'http://192.168.1.7:8082',
//                 'http://103.25.83.69:8082',
//             ],
//             methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//             allowedHeaders: ['Content-Type', 'Authorization'],
//         },
//         hmr: {
//             host: '103.25.83.69', // ✅ গ্লোবাল (Public) HMR সাপোর্ট
//         },
//     },
// });


import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: [{
                paths: ['http://192.168.1.7:8082'],
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


