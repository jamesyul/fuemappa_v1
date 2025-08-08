// --- FICHERO: src/services/api.ts ---
import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

// Lógica inteligente para determinar la URL base de la API:
// - En desarrollo (cuando `npm run dev`), usará la URL de tu .env local.
// - En producción (en Vercel), usará una ruta relativa "/api".
const API_URL = import.meta.env.VITE_API_URL || '/api';

console.log(`API URL is set to: ${API_URL}`); // Un log útil para depuración

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// El interceptor para añadir el token de sesión se mantiene igual
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;