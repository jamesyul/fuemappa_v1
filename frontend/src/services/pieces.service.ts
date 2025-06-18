// --- FICHERO: src/services/pieces.service.ts ---
import api from './api';
import { Piece } from '../types/piece.types';

export const getPieces = async (): Promise<Piece[]> => {
  const { data } = await api.get('/pieces'); // No hace falta `select=*` aquí
  return data;
};

export const createPiece = async (pieceData: Partial<Piece>): Promise<Piece> => {
  const { data } = await api.post<Piece>('/pieces', pieceData);
  return data;
};

// --- AÑADIR ESTAS FUNCIONES ---
export const updatePiece = async (id: string, pieceData: Partial<Piece>): Promise<Piece> => {
    const { data } = await api.put<Piece>(`/pieces/${id}`, pieceData);
    return data;
};

export const deletePiece = async (id: string): Promise<void> => {
    await api.delete(`/pieces/${id}`);
};