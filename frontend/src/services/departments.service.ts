// --- FICHERO: src/services/departments.service.ts ---
import api from './api'; // Importamos nuestro cliente centralizado
import { Department } from '../types/department.types';

export const getDepartments = async (): Promise<Department[]> => {
  // Usamos el cliente 'api' que ya tiene las cabeceras correctas
  const { data } = await api.get('/departments?select=*');
  return data;
};
export const createDepartment = async (data: { name: string }) => {
  const response = await axios.post('/departments', data);
  return response.data;
};

export const updateDepartment = async (id: string, data: { name: string }) => {
  const response = await axios.put(`/departments/${id}`, data);
  return response.data;
};

export const deleteDepartment = async (id: string) => {
  const response = await axios.delete(`/departments/${id}`);
  return response.data;
};
// ... otros servicios como create, update, delete ...