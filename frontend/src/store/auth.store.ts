// --- FICHERO: src/store/auth.store.ts ---
import { create } from 'zustand';
import { User } from '../types/user.types';
import { getProfile } from '../services/auth.service'; // <-- Importar servicio de perfil

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token:string) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>; // <-- NUEVA FUNCIÓN
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('session_token'),
  login: (user, token) => {
    localStorage.setItem('session_token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('session_token');
    set({ user: null, token: null });
  },
  // --- AÑADIR LÓGICA DE CHECKAUTHSTATUS ---
  checkAuthStatus: async () => {
    const token = localStorage.getItem('session_token');
    if (!token) {
      set({ user: null, token: null });
      return;
    }
    
    try {
      // Usamos el token para pedir los datos del usuario al backend
      const userProfile = await getProfile();
      set({ user: userProfile, token }); // Hidratamos el store con los datos
    } catch (error) {
      console.error("Token inválido o sesión expirada. Deslogueando.");
      // Si el token es inválido, limpiamos todo
      localStorage.removeItem('session_token');
      set({ user: null, token: null });
    }
  },
}));