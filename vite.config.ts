import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      // Enable code splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'motion': ['motion/react'],
            'vendor': ['react', 'react-dom'],
          },
        },
      },
      // Minify for smaller bundle
      minify: 'terser',
      // Generate source maps in production for debugging
      sourcemap: false,
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
