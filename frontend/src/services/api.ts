// --- FICHERO: src/services/api.ts ---
import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

// --- ESTA ES LA LÍNEA MÁS IMPORTANTE ---
// Le decimos a nuestro frontend que todas las peticiones deben ir a nuestro backend local.
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL, // <--- AQUÍ ESTÁ LA CORRECCIÓN
  headers: {
    'Content-Type': 'application/json',
  },
});

// Este interceptor añade el token de sesión a cada petición,
// permitiendo que nuestro backend verifique si el usuario está logueado.
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