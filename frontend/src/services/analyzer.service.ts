// --- FICHERO: src/services/analyzer.service.ts ---
import api from './api';

export const processCsvUrl = async (url: string): Promise<any[]> => {
  const { data } = await api.post('/api/analyzer/process-csv', { url });
  return data;
};