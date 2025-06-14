// --- FICHERO: src/store/auth.store.ts ---
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'jefe_departamento' | 'integrante_departamento';
  departmentId?: string;
}

interface AuthState {
  user: User | null;
  token: string | null; // NUEVO: Estado para almacenar el token
  // AHORA login recibe el usuario y el token
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  // Leemos el token de localStorage al iniciar, para mantener la sesión
  token: localStorage.getItem('session_token'), 
  login: (user, token) => {
    // Guardamos el token en localStorage para persistir la sesión
    localStorage.setItem('session_token', token);
    set({ user, token });
  },
  logout: () => {
    // Removemos el token de localStorage al cerrar sesión
    localStorage.removeItem('session_token');
    set({ user: null, token: null });
  },
}));