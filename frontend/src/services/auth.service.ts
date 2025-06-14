// --- FICHERO: src/services/auth.service.ts ---
import api from './api'; // Importamos NUESTRO cliente centralizado
import { User } from '../types/user.types';

// Interfaz para la respuesta que esperamos de los endpoints de auth del backend
interface AuthResponse {
  user: User;
  token: string;
}

// Interfaz para los datos del formulario de registro
interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

// --- FUNCIÓN PARA INICIAR SESIÓN ---
// Llama al endpoint de login de nuestro backend
export const loginUser = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
  // Ahora usamos 'api' que ya tiene la URL base configurada (http://localhost:5000/api)
  const { data } = await api.post<AuthResponse>('/auth/login', credentials);
  return data;
};


// --- FUNCIÓN PARA REGISTRAR UN NUEVO USUARIO ---
// Llama al endpoint de signup de nuestro backend
export const signupUser = async (userData: SignupFormData): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/signup', userData);
  return data;
};