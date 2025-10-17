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


// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';
// import os from 'os';

// // 🔍 Auto-detect local IP
// const networkInterfaces = os.networkInterfaces();
// let localIP = 'localhost';
// for (const iface of Object.values(networkInterfaces)) {
//     for (const config of iface) {
//         if (config.family === 'IPv4' && !config.internal && config.address.startsWith('192.168.')) {
//             localIP = config.address;
//         }
//     }
// }

// // 🔄 Decide which IP to use for HMR (local or public)
// const PUBLIC_IP = '103.25.83.69';
// const isLocal = localIP && !process.env.APP_ENV?.includes('production');

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/js/app.jsx'],
//             refresh: true,
//         }),
//         react(),
//     ],

//     server: {
//         host: '0.0.0.0',
//         port: 5173,
//         strictPort: true,

//         cors: {
//             origin: [
//                 `http://${localIP}:8082`,
//                 `http://${PUBLIC_IP}:8082`,
//                 'http://localhost:8082',
//             ],
//             methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//             allowedHeaders: ['Content-Type', 'Authorization'],
//         },

//         hmr: {
//             host: isLocal ? localIP : PUBLIC_IP,
//             port: 5173,
//         },
//     },
// });




// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: 'resources/js/app.jsx',
//             refresh: [{
//                 paths: ['http://192.168.1.7:8082'],
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



import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: [{
                paths: ['http://localhost:8000/'],
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

