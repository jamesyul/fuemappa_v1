import axios from 'axios';

export const getDepartments = async () => {
  const response = await axios.get('/departments');
  return response.data;
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