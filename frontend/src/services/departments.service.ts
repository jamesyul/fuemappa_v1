// --- FICHERO: src/services/departments.service.ts (CORREGIDO) ---
import api from './api'; // Importamos nuestro cliente centralizado
import { Department } from '../types/department.types';

export const getDepartments = async (): Promise<Department[]> => {
  const { data } = await api.get('/departments');
  return data;
};

export const createDepartment = async (deptData: Partial<Department>): Promise<Department> => {
  const { data } = await api.post('/departments', deptData);
  return data;
};

export const updateDepartment = async (id: string, deptData: Partial<Department>): Promise<Department> => {
  const { data } = await api.put(`/departments/${id}`, deptData);
  return data;
};

export const deleteDepartment = async (id: string): Promise<void> => {
  await api.delete(`/departments/${id}`);
};