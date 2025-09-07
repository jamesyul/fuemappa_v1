// --- FICHERO: frontend/vite.config.ts (VERSIÓN CORREGIDA) ---
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'; // <-- 1. IMPORTA EL MÓDULO 'path'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  // --- 2. AÑADE ESTE BLOQUE 'resolve' ---
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ------------------------------------
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
});