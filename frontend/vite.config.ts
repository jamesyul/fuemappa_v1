import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/', // <-- Esto asegura rutas correctas en producción
  plugins: [
    react(),
    tailwindcss(),
  ],
});
