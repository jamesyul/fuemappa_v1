import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

// En producción, Vercel proveerá esta variable. En local, no estará definida.
// Usamos /api como fallback, que Vercel redirigirá correctamente.
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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