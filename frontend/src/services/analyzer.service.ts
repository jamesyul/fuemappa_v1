import api from './api';

// La función espera que el backend devuelva un array de objetos
export const processCsvUrl = async (url: string): Promise<any[]> => {
  const { data } = await api.post('/analyzer/process-csv', { url });
  return data;
};