import axios from 'axios';

export const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post('/auth/login', credentials);
  return response.data;
};

export const signup = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post('/auth/signup', userData);
  return response.data;
};