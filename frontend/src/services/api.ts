// --- FICHERO: src/services/api.ts ---
import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

// --- ESTA ES LA LÍNEA MÁS IMPORTANTE ---
// Le decimos a nuestro frontend que todas las peticiones deben ir a nuestro backend local.
const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error("VITE_API_URL is not defined in the .env file");
}

const api = axios.create({
  baseURL: API_URL, // <--- AQUÍ ESTÁ LA CORRECCIÓN
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