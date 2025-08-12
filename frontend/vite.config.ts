import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/', // Rutas correctas en producción
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173, // Puerto del frontend en desarrollo
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Puerto donde corre tu backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // Opcional: reescribe la ruta si es necesario
      }
    }
  },
  build: {
    outDir: 'dist', // Directorio de salida (por defecto, pero es bueno ser explícito)
    sourcemap: false, // Desactivar sourcemaps en producción para reducir tamaño
  }
});