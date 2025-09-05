// --- FICHERO: src/store/pieces.store.ts (VERSIÓN MEJORADA) ---
import { create } from 'zustand';
import { Piece } from '../types/piece.types';
import { getPieces } from '../services/pieces.service';

// Interfaz para los filtros avanzados
interface PieceFilters {
  departmentId?: string;
  inStock?: 'yes' | 'no' | '';
}

interface PiecesState {
  pieces: Piece[]; // La lista original y completa de piezas
  filteredPieces: Piece[]; // La lista que se muestra en la tabla
  fetchPieces: () => Promise<void>;
  setFilter: (filter: string) => void; // Para el buscador de texto
  applyAdvancedFilters: (filters: PieceFilters) => void; // Para el modal
}

export const usePiecesStore = create<PiecesState>((set, get) => ({
  pieces: [],
  filteredPieces: [],
  fetchPieces: async () => {
    try {
      const data = await getPieces();
      set({ pieces: data, filteredPieces: data });
    } catch (error) {
      console.error('Error al obtener las piezas:', error);
      set({ pieces: [], filteredPieces: [] });
    }
  },
  
  // Filtro de texto simple (buscador)
  setFilter: (filter) => {
    const { pieces } = get();
    const lowerCaseFilter = filter.toLowerCase();
    
    // Si el filtro está vacío, muestra todas las piezas
    if (!filter) {
      set({ filteredPieces: pieces });
      return;
    }
    
    const filtered = pieces.filter((piece) =>
      piece.name.toLowerCase().includes(lowerCaseFilter) ||
      piece.code.toLowerCase().includes(lowerCaseFilter)
    );
    set({ filteredPieces: filtered });
  },

  // --- NUEVA FUNCIÓN PARA FILTROS AVANZADOS ---
  applyAdvancedFilters: (filters) => {
    const { pieces } = get();
    let tempPieces = [...pieces]; // Empezamos con la lista completa

    // Aplicamos filtro de departamento
    if (filters.departmentId) {
      tempPieces = tempPieces.filter(p => p.departmentId === filters.departmentId);
    }
    // Aplicamos filtro de stock
    if (filters.inStock === 'yes') {
      tempPieces = tempPieces.filter(p => p.quantity > 0);
    }
    if (filters.inStock === 'no') {
      tempPieces = tempPieces.filter(p => p.quantity === 0);
    }
    
    set({ filteredPieces: tempPieces });
  },
}));