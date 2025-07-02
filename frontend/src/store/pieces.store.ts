// --- FICHERO: src/store/pieces.store.ts ---
import { create } from 'zustand';
import { Piece } from '../types/piece.types';
import { getPieces } from '../services/pieces.service'; // Importamos la función del servicio

interface PiecesState {
  pieces: Piece[];
  filteredPieces: Piece[];
  setPieces: (pieces: Piece[]) => void;
  setFilteredPieces: (filteredPieces: Piece[]) => void;
  fetchPieces: () => Promise<void>;
  setFilter: (filter: string) => void;
  setDepartmentFilter: (departmentId: string) => void;
}

export const usePiecesStore = create<PiecesState>((set, get) => ({
  pieces: [],
  filteredPieces: [],
  setPieces: (pieces) => set({ pieces }),
  setFilteredPieces: (filteredPieces) => set({ filteredPieces }),
  fetchPieces: async () => {
    try {
      // AHORA usamos la función del servicio, que se autenticará automáticamente
      const data = await getPieces();
      set({ pieces: data, filteredPieces: data });
    } catch (error) {
      console.error('Error al obtener las piezas:', error);
      set({ pieces: [], filteredPieces: [] }); // En caso de error, vaciar la lista
    }
  },
  setFilter: (filter) => {
    const { pieces } = get();
    if (!filter) {
        // Si el filtro está vacío, usamos las piezas filtradas por departamento
        const departmentFilteredPieces = get().filteredPieces;
        set({ filteredPieces: departmentFilteredPieces });
        return;
    }
    const lowerCaseFilter = filter.toLowerCase();
    set({
      filteredPieces: pieces.filter((piece) =>
        // --- LÍNEA CLAVE CORREGIDA ---
        // Ahora busca tanto en el nombre como en el código
        piece.name.toLowerCase().includes(lowerCaseFilter) ||
        piece.code.toLowerCase().includes(lowerCaseFilter)
      ),
    });
  },
  setDepartmentFilter: (departmentId) => {
    const { pieces } = get();
    set({
      filteredPieces: departmentId
        ? pieces.filter((piece) => piece.departmentId === departmentId)
        : pieces,
    });
  },
}));