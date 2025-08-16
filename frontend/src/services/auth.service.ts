// --- FICHERO: src/services/auth.service.ts ---
import api from './api';
import { User } from '../types/user.types';

interface AuthResponse { user: User; token: string; }

// Interfaz para el formulario de registro, ahora con el código
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  invitationCode: string; // <-- NUEVO
}

export const loginUser = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/api/auth/login', credentials);
  return data;
};
export const signupUser = async (userData: SignupFormData): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/api/auth/signup', userData);
  return data;
};

// --- AÑADIR ESTA FUNCIÓN ---
export const getProfile = async (): Promise<User> => {
    const { data } = await api.get<User>('/api/auth/profile');
    return data;
};



