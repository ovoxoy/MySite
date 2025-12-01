import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // SPA Fallback: Alle Routen auf index.html umleiten
      preview: {
        port: 4173,
        host: '0.0.0.0',
      },
      build: {
        // Wichtig für SPA: Alle Routen müssen auf index.html zeigen
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
    };
});
