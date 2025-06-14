// --- FICHERO: src/services/pieces.service.ts ---
import api from './api'; // Importamos nuestro cliente centralizado
import { Piece } from '../types/piece.types';

export const getPieces = async (): Promise<Piece[]> => {
  // Usamos el cliente 'api' que ya tiene las cabeceras correctas
  const { data } = await api.get('/pieces?select=*');
  return data;
};

export const createPiece = async (pieceData: Partial<Piece>): Promise<Piece> => {
  const { data } = await api.post('/pieces', pieceData);
  return data;
};

// ... otros servicios como updatePiece, deletePiece ...