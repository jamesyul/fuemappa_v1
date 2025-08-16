// --- FICHERO: src/services/pieces.service.ts ---
import api from './api';
import { Piece } from '../types/piece.types';

export const getPieces = async (): Promise<Piece[]> => {
  // ANTES: '/pieces'
  // DESPUÉS:
  const { data } = await api.get('/api/pieces');
  return data;
};

export const createPiece = async (pieceData: Partial<Piece>): Promise<Piece> => {
  // ANTES: '/pieces'
  // DESPUÉS:
  const { data } = await api.post<Piece>('/api/pieces', pieceData);
  return data;
};

export const updatePiece = async (id: string, pieceData: Partial<Piece>): Promise<Piece> => {
  // ANTES: `/pieces/${id}`
  // DESPUÉS:
  const { data } = await api.put<Piece>(`/api/pieces/${id}`, pieceData);
  return data;
};

export const deletePiece = async (id: string): Promise<void> => {
  // ANTES: `/pieces/${id}`
  // DESPUÉS:
  await api.delete(`/api/pieces/${id}`);
};