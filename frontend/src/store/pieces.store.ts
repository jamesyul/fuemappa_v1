import { create } from 'zustand';
import { Piece } from '../types/piece.types';

interface PiecesState {
  pieces: Piece[];
  filteredPieces: Piece[];
  setPieces: (pieces: Piece[]) => void; // Nueva función para actualizar pieces
  setFilteredPieces: (filteredPieces: Piece[]) => void; // Nueva función para actualizar filteredPieces
  fetchPieces: () => Promise<void>;
  setFilter: (filter: string) => void;
  setDepartmentFilter: (departmentId: string) => void;
}

export const usePiecesStore = create<PiecesState>((set) => ({
  pieces: [],
  filteredPieces: [],
  setPieces: (pieces) => set({ pieces }), // Implementación de setPieces
  setFilteredPieces: (filteredPieces) => set({ filteredPieces }), // Implementación de setFilteredPieces
  fetchPieces: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pieces');
      const data = await response.json();
      set({ pieces: data, filteredPieces: data });
    } catch (error) {
      console.error('Error al obtener las piezas:', error);
    }
  },
  setFilter: (filter) => {
    set((state) => ({
      filteredPieces: state.pieces.filter((piece) =>
        piece.name.toLowerCase().includes(filter.toLowerCase())
      ),
    }));
  },
  setDepartmentFilter: (departmentId) => {
    set((state) => ({
      filteredPieces: departmentId
        ? state.pieces.filter((piece) => piece.departmentId === departmentId)
        : state.pieces,
    }));
  },
}));