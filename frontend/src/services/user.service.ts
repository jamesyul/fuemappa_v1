import api from './api';
import { User } from '../types/user.types';

export const getUsersByDepartment = async (departmentId: string): Promise<User[]> => {
  const { data } = await api.get(`/users/department/${departmentId}`);
  return data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/users/${userId}`);
};