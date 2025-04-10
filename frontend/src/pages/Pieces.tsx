import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { usePiecesStore } from '../store/pieces.store';
import { Piece } from '../types/piece.types';

// Mapeo de departmentId a department
const departmentIdToDepartmentMap: { [key: string]: string } = {
  d1: 'engine',
  d2: 'transmission',
  d3: 'vehicle_dynamics',
  d4: 'aero',
  d5: 'chassis',
};

const getDepartmentNameFromId = (departmentId: string | undefined): string => {
  if (!departmentId) return '';
  return departmentIdToDepartmentMap[departmentId] || '';
};

const Pieces: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    pieces, 
    filteredPieces, 
    setPieces,          // Ahora está definido en el store
    setFilteredPieces,  // Ahora está definido en el store
    fetchPieces, 
    setFilter, 
    setDepartmentFilter 
  } = usePiecesStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newPiece, setNewPiece] = useState<Piece>({
    id: '',
    code: '',
    name: '',
    department: getDepartmentNameFromId(user?.departmentId),
    quantity: 0,
    price: 0,
    report: '',
    departmentId: user?.departmentId || '',
    departmentName: getDepartmentNameFromId(user?.departmentId),
  });
  const [editPiece, setEditPiece] = useState<Piece>({
    id: '',
    code: '',
    name: '',
    department: '',
    quantity: 0,
    price: 0,
    report: '',
    departmentId: '',
    departmentName: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPieces();

    if (user.role === 'jefe_departamento' || user.role === 'integrante_departamento') {
      if (user.departmentId) {
        console.log('Filtrando piezas para departmentId:', user.departmentId);
        setDepartmentFilter(user.departmentId);
      } else {
        console.error('El usuario no tiene un departamento asignado');
        setDepartmentFilter('d1');
      }
    } else {
      console.log('Mostrando todas las piezas para admin');
      setDepartmentFilter('');
      setFilter('');
    }
  }, [user, navigate, fetchPieces, setDepartmentFilter, setFilter]);

  // Ejemplo de cómo podrías usar setPieces y setFilteredPieces
  const handleResetPieces = () => {
    setPieces([]);          // Esto ahora funciona sin errores
    setFilteredPieces([]);  // Esto ahora funciona sin errores
  };

  if (!user) return null;

  return (
    <div>
      <h1>Piezas</h1>
      <button onClick={handleResetPieces}>Reiniciar piezas</button>
      {/* Aquí va el resto de tu JSX */}
    </div>
  );
};

export default Pieces;