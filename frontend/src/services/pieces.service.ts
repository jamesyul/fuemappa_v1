// src/services/pieces.service.ts
import axios from 'axios';
import { Piece } from '../types/piece.types';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

export const fetchPieces = async (): Promise<Piece[]> => {
  const response = await api.get('/pieces');
  return response.data;
};

export default { fetchPieces };
export {}; // Añade esta línea al final