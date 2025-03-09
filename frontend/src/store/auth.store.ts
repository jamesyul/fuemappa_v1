/*import { create } from 'zustand';

interface AuthState {
  user: { id: string; name: string; role: string; departmentId?: string } | null;
  login: (userData: { id: string; name: string; role: string; departmentId?: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
*/
// src/store/auth.store.ts
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'jefe_departamento' | 'integrante_departamento';
  departmentId?: string; // Opcional para jefe/integrante
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));