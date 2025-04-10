import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { usePiecesStore } from '../store/pieces.store';
import { Piece } from '../types/piece.types';
import { FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { Fragment } from 'react';
import PieceForm from '../components/forms/PieceForm';

// Mapeo de departmentId a department y viceversa
const departmentIdToDepartmentMap: { [key: string]: string } = {
  d1: 'engine',
  d2: 'transmission',
  d3: 'vehicle_dynamics',
  d4: 'aero',
  d5: 'chassis',
};

const departmentToDepartmentIdMap: { [key: string]: string } = {
  engine: 'd1',
  transmission: 'd2',
  vehicle_dynamics: 'd3',
  aero: 'd4',
  chassis: 'd5',
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
  const [editPiece, setEditPiece] = useState<Piece>({
    id: '',
    code: '',
    name: '',
    departament: '',
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
    fetchPiecesFromBackend();

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
  }, [user, navigate, setDepartmentFilter, setFilter]);

  const fetchPiecesFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pieces');
      const data = await response.json();
      // Mapear department a departmentId y departmentName
      const mappedPieces = data.map((piece: Piece) => ({
        ...piece,
        departmentId: departmentToDepartmentIdMap[piece.departament],
        departmentName: piece.departament,
      }));
      setPieces(mappedPieces);
      setFilteredPieces(mappedPieces);
    } catch (error) {
      console.error('Error al obtener las piezas:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilter(e.target.value);
  };

  const canEditDelete = user?.role === 'admin' || user?.role === 'jefe_departamento';

  const handleCreatePiece = async (piece: Piece, imageFile?: File | null) => {
    try {
      const formData = new FormData();
      formData.append('code', piece.code);
      formData.append('name', piece.name);
      formData.append('departament', piece.departament);
      formData.append('quantity', piece.quantity.toString());
      formData.append('price', piece.price.toString());
      formData.append('report', piece.report || '');
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch('http://localhost:5000/api/pieces', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newPiece = await response.json();
        // Mapear department a departmentId y departmentName
        newPiece.departmentId = departmentToDepartmentIdMap[newPiece.departament];
        newPiece.departmentName = newPiece.departament;
        const updatedPieces = [...pieces, newPiece];
        setPieces(updatedPieces);
        setFilteredPieces(updatedPieces);
        setIsCreateOpen(false);
      } else {
        console.error('Error al crear la pieza');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleEditPiece = async (piece: Piece, imageFile?: File | null) => {
    try {
      const formData = new FormData();
      formData.append('code', piece.code);
      formData.append('name', piece.name);
      formData.append('departament', piece.departament);
      formData.append('quantity', piece.quantity.toString());
      formData.append('price', piece.price.toString());
      formData.append('report', piece.report || '');
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`http://localhost:5000/api/pieces/${piece.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedPiece = await response.json();
        // Mapear department a departmentId y departmentName
        updatedPiece.departmentId = departmentToDepartmentIdMap[updatedPiece.departament];
        updatedPiece.departmentName = updatedPiece.departament;
        const updatedPieces = pieces.map((p: Piece) => (p.id === updatedPiece.id ? updatedPiece : p));
        setPieces(updatedPieces);
        setFilteredPieces(updatedPieces);
        setIsEditOpen(false);
      } else {
        console.error('Error al actualizar la pieza');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

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

      {/* Barra de búsqueda y filtros */}
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

      {/* Tabla de piezas */}
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
            </tr>
          </thead>
          <tbody>
            {filteredPieces.length === 0 ? (
              <tr>
                <td colSpan={user.role === 'admin' ? 6 : 5} className="py-4 text-center text-gray-500">
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
                            className="absolute right-2 mt-1 w-32 origin-top-right rounded-md bg-white border border-gray-200 focus:outline-none z-50"
                            style={{ position: 'absolute', top: '100%', right: '0.5rem' }}
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
                                    } group flex w-full items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                                  >
                                    Editar
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      if (window.confirm('¿Estás seguro de eliminar esta pieza?')) {
                                        alert(`Eliminar pieza ${piece.code}`);
                                      }
                                    }}
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } group flex w-full items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
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

      {/* Emergente para informe */}
      <Transition appear show={isReportOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsReportOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-5" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Informe de Pieza
                  </Dialog.Title>
                  <div className="mt-2">
                    {selectedPiece && (
                      <ul className="list-disc pl-5 text-gray-700">
                        <li>Nombre: {selectedPiece.name}</li>
                        <li>Código: {selectedPiece.code}</li>
                        <li>Departamento: {selectedPiece.departmentName || 'Sin departamento'}</li>
                        <li>Cantidad: {selectedPiece.quantity}</li>
                        <li>Precio: €{selectedPiece.price.toLocaleString()}</li>
                        <li>Informe: {selectedPiece.report}</li>
                      </ul>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setIsReportOpen(false)}
                    >
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Emergente para crear pieza */}
      <Transition appear show={isCreateOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsCreateOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-5" onClick={() => setIsCreateOpen(false)} />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Crear Nueva Pieza
                  </Dialog.Title>
                  {newPiece ? (
                    <PieceForm piece={newPiece} onSubmit={handleCreatePiece} />
                  ) : (
                    <p className="text-red-500">Error: newPiece no está definido</p>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Emergente para editar pieza */}
      <Transition appear show={isEditOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsEditOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-5" onClick={() => setIsEditOpen(false)} />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Editar Pieza
                  </Dialog.Title>
                  <PieceForm piece={editPiece} onSubmit={handleEditPiece} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Pieces;