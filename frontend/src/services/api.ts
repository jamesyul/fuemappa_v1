import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

// Crea una instancia de Axios pre-configurada.
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Obtiene el estado más reciente del store de autenticación.
    const token = useAuthStore.getState().token;
    
    // Si existe un token, lo añade a la cabecera 'Authorization'.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Devuelve la configuración modificada para que la petición continúe.
    return config;
  },
  (error) => {
    // Si hay un error al configurar la petición, lo rechaza.
    return Promise.reject(error);
  }
);

export default api;