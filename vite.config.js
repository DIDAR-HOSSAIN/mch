import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            // refresh: true,
            refresh: [{
                paths: ['http://localhost:8000/help'],
                config: {
                    delay: 300
                }
            }],
        }),
        react(),

        
    ],
});
