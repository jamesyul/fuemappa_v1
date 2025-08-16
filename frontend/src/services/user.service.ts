// --- FICHERO: src/services/user.service.ts ---
import api from './api';
import { User } from '../types/user.types';

export const getUsersByDepartment = async (departmentId: string): Promise<User[]> => {
  // ANTES: `/users/department/${departmentId}`
  // DESPUÉS:
  const { data } = await api.get(`/api/users/department/${departmentId}`);
  return data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  // ANTES: `/users/${userId}`
  // DESPUÉS:
  await api.delete(`/api/users/${userId}`);
};