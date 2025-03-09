// src/components/common/PieceCard.tsx
import React from 'react';
import { Piece } from '../../types/piece.types';

interface PieceCardProps {
  piece: Piece;
}

const PieceCard: React.FC<PieceCardProps> = ({ piece }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900">{piece.name}</h3>
      <p className="text-gray-700">Código: {piece.code}</p>
      <p className="text-gray-700">Departamento: {piece.departmentName || 'Sin departamento'}</p>
      <p className="text-gray-700">Cantidad: {piece.quantity}</p>
      <p className="text-gray-700">Precio: ${piece.price.toLocaleString()}</p>
    </div>
  );
};

export default PieceCard;
export {}; // Añade esta línea al final para marcarlo como módulo