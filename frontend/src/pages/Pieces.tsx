import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { usePiecesStore } from '../store/pieces.store';
import { Piece } from '../types/piece.types';
import { FaEllipsisV, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import { Dialog, Transition, Menu } from '@headlessui/react';
import PieceForm from '../components/forms/PieceForm';
import { createPiece, updatePiece, deletePiece } from '../services/pieces.service';

const ReportDisplay = ({ report }: { report: string }) => {
  if (!report || report.trim() === '') {
    return <p className="text-gray-500 italic">No hay informe disponible.</p>;
  }
  const isUrl = report.startsWith('http');
  const isImage = /\.(jpe?g|png|gif|webp)$/i.test(report);
  const isPdf = /\.pdf$/i.test(report);

  if (isUrl) {
    if (isImage) {
      return (
        <a href={report} target="_blank" rel="noopener noreferrer">
          <img src={report} alt="Informe de pieza" className="max-w-full h-auto rounded-lg border" />
        </a>
      );
    }
    if (isPdf) {
      return (
        <a href={report} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-indigo-600 hover:underline">
          <FaFilePdf size={20} />
          <span>Ver PDF en nueva pestaña</span>
        </a>
      );
    }
    return (
      <a href={report} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-indigo-600 hover:underline">
        <FaExternalLinkAlt />
        <span>Abrir enlace del informe</span>
      </a>
    );
  }
  return <p className="text-sm text-gray-800 whitespace-pre-wrap">{report}</p>;
};

const departmentIdToDepartmentMap: { [key: string]: string } = {
  d1: 'Vehicle Dynamics',
  d2: 'Engine',
  d3: 'Aero',
  d4: 'Chassis',
};
const getDepartmentNameFromId = (departmentId: string | undefined): string => {
  if (!departmentId) return '';
  return departmentIdToDepartmentMap[departmentId] || '';
};

const Pieces: React.FC = () => {
    const { user } = useAuthStore();
    const { pieces, filteredPieces, fetchPieces, setFilter } = usePiecesStore();
    const setDepartmentFilter = usePiecesStore(state => state.setDepartmentFilter);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [newPiece, setNewPiece] = useState<Piece>({ id: '', code: '', name: '', departmentId: user?.departmentId || '', quantity: 0, price: 0, report: '', departmentName: getDepartmentNameFromId(user?.departmentId), departament: '', });
    const [editPiece, setEditPiece] = useState<Piece | null>(null);

    useEffect(() => {
        if (user) {
            fetchPieces();
        } else {
            navigate('/login');
        }
    }, [user, navigate, fetchPieces]);

    useEffect(() => {
        if (user && pieces.length > 0) {
            if (user.role === 'admin') {
                setDepartmentFilter('');
            } else if (user.role === 'jefe_departamento' || user.role === 'integrante_departamento') {
                if (user.departmentId) {
                    setDepartmentFilter(user.departmentId);
                }
            }
        }
    }, [user, pieces, setDepartmentFilter]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setFilter(e.target.value);
    };

    const canEditDelete = user?.role === 'admin' || user?.role === 'jefe_departamento';

    const handleCreatePiece = async (piece: Piece, imageFile?: File | null) => {
        try {
            const pieceDataForApi = { code: piece.code, name: piece.name, departmentId: piece.departmentId, quantity: Number(piece.quantity), price: Number(piece.price), report: piece.report, };
            await createPiece(pieceDataForApi);
            alert('Pieza creada con éxito!');
            await fetchPieces();
            setIsCreateOpen(false);
        } catch (error: any) {
            console.error('Error al crear la pieza:', error);
            alert(`Error: ${error.response?.data?.message || 'No se pudo crear la pieza.'}`);
        }
    };

    const handleEditPiece = async (piece: Piece, imageFile?: File | null) => {
        if (!editPiece?.id) return;
        try {
            const pieceDataForApi = { code: piece.code, name: piece.name, departmentId: piece.departmentId, quantity: Number(piece.quantity), price: Number(piece.price), report: piece.report, };
            await updatePiece(editPiece.id, pieceDataForApi);
            alert('Pieza actualizada con éxito!');
            await fetchPieces();
            setIsEditOpen(false);
            setEditPiece(null);
        } catch (error: any) {
            console.error('Error al actualizar la pieza:', error);
            alert(`Error: ${error.response?.data?.message || 'No se pudo actualizar la pieza.'}`);
        }
    };

    const handleDeletePiece = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar esta pieza?')) {
            try {
                await deletePiece(id);
                alert('Pieza eliminada con éxito!');
                await fetchPieces();
            } catch (error: any) {
                console.error('Error al eliminar la pieza:', error);
                alert(`Error: ${error.response?.data?.message || 'No se pudo eliminar la pieza.'}`);
            }
        }
    };

    if (!user) {
        return <div className="text-center p-10">Cargando...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Piezas</h1>
                {canEditDelete && (<button onClick={() => setIsCreateOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Crear Pieza</button>)}
            </div>
            <div className="mb-4 flex space-x-4">
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar piezas..." className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full max-w-md"/>
                <button onClick={() => alert('Filtro avanzado no implementado aún')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Filtro Avanzado</button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full">
                    {/* ... (resto del JSX de la tabla y modales sin cambios) ... */}
                </table>
            </div>
        </div>
    );
};

export default Pieces;