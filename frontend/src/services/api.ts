// --- FICHERO: src/services/api.ts (VERSIÓN FINAL Y CORRECTA) ---
import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

// La baseURL ahora es SOLO el dominio del backend, que se lee de la variable de entorno.
// En desarrollo local, esta variable estará vacía y axios usará rutas relativas (/api/...),
// que serán interceptadas por el proxy de Vite.
// En producción, Vercel le dará el valor completo del dominio del backend.
const API_URL = import.meta.env.VITE_API_URL || ''; 

console.log(`API base URL is set to: ${API_URL}`);

const api = axios.create({
  baseURL: API_URL, // <-- ¡YA NO CONTIENE /api!
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// El interceptor para el token se queda exactamente igual.
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