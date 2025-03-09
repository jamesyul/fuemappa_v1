// src/components/forms/PieceForm.tsx
import React from 'react';
import { Piece } from '../../types/piece.types';

interface PieceFormProps {
  piece: Piece;
  onSubmit: (piece: Piece) => void;
}

const PieceForm: React.FC<PieceFormProps> = ({ piece, onSubmit }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(piece); }}>
      {/* Tu formulario aquí */}
    </form>
  );
};

export default PieceForm;
export {}; // Añade esta línea al final