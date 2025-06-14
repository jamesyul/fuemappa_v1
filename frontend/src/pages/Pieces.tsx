// --- FICHERO: src/pages/Pieces.tsx ---

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { usePiecesStore } from '../store/pieces.store';
import { Piece } from '../types/piece.types';
import { FaEllipsisV } from 'react-icons/fa';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { Fragment } from 'react';
import PieceForm from '../components/forms/PieceForm';

// Mapeos (asumiendo que los unificaremos eventualmente, por ahora se mantienen para compatibilidad)
const departmentIdToDepartmentMap: { [key: string]: string } = {
  d1: 'Vehicle Dynamics',
  d2: 'Engine',
  d3: 'Aero',
  d4: 'Chassis',
};

const departmentToDepartmentIdMap: { [key: string]: string } = {
  'Vehicle Dynamics': 'd1',
  Engine: 'd2',
  Aero: 'd3',
  Chassis: 'd4',
};

const getDepartmentNameFromId = (departmentId: string | undefined): string => {
  if (!departmentId) return '';
  return departmentIdToDepartmentMap[departmentId] || '';
};

const Pieces: React.FC = () => {
  const { user } = useAuthStore();
  const { pieces, filteredPieces, setPieces, setFilteredPieces, fetchPieces, setFilter, setDepartmentFilter } = usePiecesStore();
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
    departament: getDepartmentNameFromId(user?.departmentId),
    quantity: 0,
    price: 0,
    report: '',
    departmentId: user?.departmentId || '',
    departmentName: getDepartmentNameFromId(user?.departmentId),
  });
  const [editPiece, setEditPiece] = useState<Piece | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Usamos el fetch de zustand que ya tienes
    fetchPieces();

    if (user.role === 'jefe_departamento' || user.role === 'integrante_departamento') {
      if (user.departmentId) {
        setDepartmentFilter(user.departmentId);
      } else {
        setDepartmentFilter('d1'); // Fallback
      }
    } else {
      setDepartmentFilter('');
      setFilter('');
    }
  }, [user, navigate, setDepartmentFilter, setFilter, fetchPieces]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilter(e.target.value);
  };

  const canEditDelete = user?.role === 'admin' || user?.role === 'jefe_departamento';

  const handleCreatePiece = async (piece: Piece, imageFile?: File | null) => {
    // Aquí iría tu lógica de POST a la API
    console.log("Creando pieza:", piece, "con imagen:", imageFile);
    // Simulación de creación local para visualización inmediata
    const createdPiece: Piece = { ...piece, id: Date.now().toString() };
    const updatedPieces = [...pieces, createdPiece];
    setPieces(updatedPieces);
    setFilteredPieces(updatedPieces);
    setIsCreateOpen(false);
  };

  const handleEditPiece = async (piece: Piece, imageFile?: File | null) => {
    // Aquí iría tu lógica de PUT a la API
    console.log("Editando pieza:", piece.id, "con datos:", piece, "e imagen:", imageFile);
    // Simulación de edición local
    const updatedPieces = pieces.map((p) => (p.id === piece.id ? piece : p));
    setPieces(updatedPieces);
    setFilteredPieces(updatedPieces);
    setIsEditOpen(false);
    setEditPiece(null);
  };

  const handleDeletePiece = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta pieza?')) {
        // Lógica para eliminar la pieza
        console.log("Eliminando pieza:", id);
        const updatedPieces = pieces.filter(p => p.id !== id);
        setPieces(updatedPieces);
        setFilteredPieces(updatedPieces);
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Piezas</h1>
        {canEditDelete && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Crear Pieza
          </button>
        )}
      </div>

      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar piezas..."
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full max-w-md"
        />
        <button
          onClick={() => alert('Filtro avanzado no implementado aún')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Filtro Avanzado
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Código</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre de Pieza</th>
              {user.role === 'admin' && (
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Departamento</th>
              )}
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Cantidad</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Precio</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Informe</th>
              {canEditDelete && <th className="py-3 px-4"></th>}
            </tr>
          </thead>
          <tbody>
            {filteredPieces.length === 0 ? (
              <tr>
                <td colSpan={user.role === 'admin' ? 7 : 6} className="py-4 text-center text-gray-500">
                  No hay piezas registradas.
                </td>
              </tr>
            ) : (
              filteredPieces.map((piece: Piece) => (
                <tr key={piece.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{piece.code}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{piece.name}</td>
                  {user.role === 'admin' && (
                    <td className="py-3 px-4 text-sm text-gray-700">{piece.departmentName || 'Sin departamento'}</td>
                  )}
                  <td className="py-3 px-4 text-sm text-gray-700">{piece.quantity}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">€{piece.price.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <button
                      onClick={() => {
                        setSelectedPiece(piece);
setIsReportOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Ver informe
                    </button>
                  </td>
                  {canEditDelete && (
                    <td className="relative py-3 px-4">
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <FaEllipsisV />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                          >
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      setEditPiece(piece);
                                      setIsEditOpen(true);
                                    }}
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                  >
                                    Editar
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleDeletePiece(piece.id)}
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } group flex w-full items-center px-4 py-2 text-sm text-red-600`}
                                  >
                                    Eliminar
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL PARA CREAR PIEZA --- */}
      <Transition appear show={isCreateOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsCreateOpen(false)}>
            {/* CAMBIO: Se añade backdrop-blur-sm para el efecto borroso y se ajusta la opacidad */}
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Crear Nueva Pieza
                            </Dialog.Title>
                            {/* CAMBIO: Se pasa la lista de piezas para calcular el índice */}
                            <PieceForm piece={newPiece} onSubmit={handleCreatePiece} allPieces={pieces} />
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
      </Transition>

      {/* --- MODAL PARA EDITAR PIEZA --- */}
      {editPiece && (
        <Transition appear show={isEditOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsEditOpen(false)}>
                {/* CAMBIO: Mismo fondo para el modal de editar */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Editar Pieza
                            </Dialog.Title>
                            {/* CAMBIO: Se pasa la lista de piezas para el cálculo del índice, aunque en edición no se use */}
                            <PieceForm piece={editPiece} onSubmit={handleEditPiece} allPieces={pieces}/>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default Pieces;