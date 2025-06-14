// --- FICHERO: src/services/api.ts ---
import axios from 'axios';
import { useAuthStore } from '../store/auth.store'; // Importamos el store de auth

// Reemplaza esto con tu URL de Supabase y tu anon key
const SUPABASE_URL = 'https://bnnnijnoqismqxvssmzq.supabase.co'; // O la URL de tu proyecto en Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubm5pam5vcWlzbXF4dnNzbXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NTI5NjYsImV4cCI6MjA1NjMyODk2Nn0.Y2oMZ2mcxsRMmiRdMM1uOYhIDMWMUncYCf6FtNGwdHE'; // Ejemplo de anon key

const api = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`, // Las APIs de Supabase usan /rest/v1
  headers: {
    'apikey': SUPABASE_ANON_KEY, // La anon key siempre es necesaria
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token de sesión del usuario logueado
api.interceptors.request.use(
  (config) => {
    // Obtenemos el token desde el store de Zustand
    const token = useAuthStore.getState().token;
    
    // Si hay un token, lo añadimos a la cabecera de Autorización
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Si no hay token, aseguramos que la autorización sea la anon key para peticiones públicas
        config.headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;