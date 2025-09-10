// frontend/src/lib/diagnosticQuestions.ts
import { Piece } from '../types/piece.types';

export interface Answer {
  text: string;
  nextStep: string;
  filterValue?: any;
}

export interface QuestionStep {
  id: string;
  text: string;
  type: 'choice';
  getAnswers: (pieces: Piece[], currentFilters: any) => Answer[];
  filterKey?: keyof Piece;
}

// Mapeo de prefijos de código a nombres de ensamblaje (igual que antes)
const assemblyMap: { [key: string]: string } = {
  'BR': 'Frenos (Brakes)', 'SU': 'Suspensión', 'ST': 'Dirección (Steering)',
  'WT': 'Ruedas y Neumáticos', 'EN': 'Motor y Transmisión', 'EL': 'Sistema Eléctrico',
  'FR': 'Chasis y Carrocería', 'CO': 'Cockpit', 'MS': 'Misceláneos',
};

export const questionTree: { [key: string]: QuestionStep } = {
  // --- PASO 1: SISTEMA PRINCIPAL ---
  INITIAL: {
    id: 'SYSTEM',
    text: '¿En qué sistema principal del vehículo se encuentra el problema o la pieza?',
    type: 'choice',
    filterKey: 'departmentId',
    // Usamos tus IDs y nombres de departamento reales
    getAnswers: () => [
      { text: 'Vehicle Dynamics', nextStep: 'ASSEMBLY', filterValue: 'VD' },
      { text: 'Engine', nextStep: 'ASSEMBLY', filterValue: 'EN' },
      { text: 'Chassis', nextStep: 'ASSEMBLY', filterValue: 'CH' },
      { text: 'Aero', nextStep: 'ASSEMBLY', filterValue: 'AE' },
    ],
  },
  // --- PASO 2: ENSAMBLAJE (DINÁMICO) ---
  ASSEMBLY: {
    id: 'ASSEMBLY',
    text: 'Perfecto. Ahora, ¿a qué ensamblaje o subsistema pertenece?',
    type: 'choice',
    getAnswers: (pieces, currentFilters) => {
      const relevantPieces = pieces.filter(p => p.departmentId === currentFilters.departmentId);
      const uniqueAssemblyCodes = [...new Set(relevantPieces.map(p => p.code.split('-')[0]))];
      
      return uniqueAssemblyCodes.map(code => ({
        text: assemblyMap[code] || code,
        nextStep: 'RESULTS',
        filterValue: code,
      }));
    },
    filterKey: 'code', 
  },
};