// --- FICHERO: src/services/api.ts ---
import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

// Lógica inteligente para determinar la URL base de la API:
// - En desarrollo: usa la variable de entorno local
// - En producción: usa la variable de entorno de Vercel
const API_URL = import.meta.env.VITE_API_URL || 'https://fuemappa-backend.vercel.app/api';

console.log(`API URL is set to: ${API_URL}`); // Un log útil para depuración

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para CORS con cookies/sessions
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