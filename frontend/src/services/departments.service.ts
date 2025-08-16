// --- FICHERO: src/services/departments.service.ts ---
import api from './api';
import { Department } from '../types/department.types';

export const getDepartments = async (): Promise<Department[]> => {
  // ANTES: '/departments'
  // DESPUÉS:
  const { data } = await api.get('/api/departments');
  return data;
};

export const createDepartment = async (deptData: Partial<Department>): Promise<Department> => {
  // ANTES: '/departments'
  // DESPUÉS:
  const { data } = await api.post('/api/departments', deptData);
  return data;
};

export const updateDepartment = async (id: string, deptData: Partial<Department>): Promise<Department> => {
  // ANTES: `/departments/${id}`
  // DESPUÉS:
  const { data } = await api.put(`/api/departments/${id}`, deptData);
  return data;
};

export const deleteDepartment = async (id: string): Promise<void> => {
  // ANTES: `/departments/${id}`
  // DESPUÉS:
  await api.delete(`/api/departments/${id}`);
};