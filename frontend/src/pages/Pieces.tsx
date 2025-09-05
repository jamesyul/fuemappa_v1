import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { usePiecesStore } from '../store/pieces.store';
import { useDepartmentsStore } from '../store/departments.store'; // Importamos el store de departamentos
import { Piece } from '../types/piece.types';
import { FaEllipsisV, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import { Dialog, Transition, Menu } from '@headlessui/react';
import PieceForm from '../components/forms/PieceForm';
import { createPiece, updatePiece, deletePiece } from '../services/pieces.service';

// Componente helper para mostrar el informe
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

// Mapeos
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
    // Usamos las nuevas funciones del store
    const { pieces, filteredPieces, fetchPieces, setFilter, applyAdvancedFilters } = usePiecesStore();
    const { departments, fetchDepartments } = useDepartmentsStore(); // Para el select del modal
    const navigate = useNavigate();
    
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editPiece, setEditPiece] = useState<Piece | null>(null);

    // Estado para el modal de filtros
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({ departmentId: '', inStock: '' });

    // --- CORRECCIÓN CLAVE: El estado para la nueva pieza se define aquí ---
    const [newPieceData, setNewPieceData] = useState<Partial<Piece>>({
        code: '',
        name: '',
        departmentId: user?.role === 'jefe_departamento' ? user.departmentId : '',
        quantity: 0,
        price: 0,
        report: ''
    });

    useEffect(() => {
        if (user) {
            fetchPieces();
            fetchDepartments(); // Cargamos los departamentos para el filtro
        } else {
            navigate('/login');
        }
    }, [user, navigate, fetchPieces, fetchDepartments]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setFilter(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleApplyFilters = () => {
        applyAdvancedFilters(filters);
        setIsFilterModalOpen(false);
    };
    
    const handleClearFilters = () => {
        setFilters({ departmentId: '', inStock: '' });
        fetchPieces(); // Recarga todas las piezas sin filtros
        setIsFilterModalOpen(false);
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
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Stock de las piezas</h1>
                {canEditDelete && (<button onClick={() => setIsCreateOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Crear Pieza</button>)}
            </div>
            <div className="mb-4 flex space-x-4">
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar piezas..." className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full max-w-md"/>
                <button onClick={() => setIsFilterModalOpen(true)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                    Filtro Avanzado
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Código</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre</th>
                            {user.role === 'admin' && (<th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Departamento</th>)}
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Cantidad</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Precio</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Informe</th>
                            {canEditDelete && <th className="py-3 px-4"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPieces.length === 0 ? (
                            <tr><td colSpan={user.role === 'admin' ? 7 : 6} className="py-4 text-center text-gray-500">No hay piezas registradas.</td></tr>
                        ) : (
                            filteredPieces.map((piece: Piece) => (
                                <tr key={piece.id} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-700">{piece.code}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700">{piece.name}</td>
                                    {user.role === 'admin' && (<td className="py-3 px-4 text-sm text-gray-700">{piece.departmentName || 'Sin departamento'}</td>)}
                                    <td className="py-3 px-4 text-sm text-gray-700">{piece.quantity}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700">€{piece.price.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700"><button onClick={() => { setSelectedPiece(piece); setIsReportOpen(true); }} className="text-indigo-600 hover:text-indigo-800">Ver informe</button></td>
                                    {canEditDelete && (
                                        <td className="relative py-3 px-4">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div><Menu.Button className="text-gray-500 hover:text-gray-700 focus:outline-none"><FaEllipsisV /></Menu.Button></div>
                                                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                                    <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                                        <div className="py-1">
                                                            <Menu.Item>{({ active }) => (<button onClick={() => { setEditPiece(piece); setIsEditOpen(true); }} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-700`}>Editar</button>)}</Menu.Item>
                                                            <Menu.Item>{({ active }) => (<button onClick={() => handleDeletePiece(piece.id)} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center px-4 py-2 text-sm text-red-600`}>Eliminar</button>)}</Menu.Item>
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

            <Transition appear show={isCreateOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsCreateOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Crear Nueva Pieza</Dialog.Title>
                                    <PieceForm piece={newPieceData} onSubmit={handleCreatePiece} allPieces={pieces} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {editPiece && (<Transition appear show={isEditOpen} as={Fragment}><Dialog as="div" className="relative z-10" onClose={() => setIsEditOpen(false)}><Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" /></Transition.Child><div className="fixed inset-0 overflow-y-auto"><div className="flex min-h-full items-center justify-center p-4 text-center"><Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"><Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"><Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Editar Pieza</Dialog.Title><PieceForm piece={editPiece} onSubmit={handleEditPiece} allPieces={pieces}/></Dialog.Panel></Transition.Child></div></div></Dialog></Transition>)}
            {selectedPiece && (<Transition appear show={isReportOpen} as={Fragment}><Dialog as="div" className="relative z-10" onClose={() => setIsReportOpen(false)}><Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" /></Transition.Child><div className="fixed inset-0 overflow-y-auto"><div className="flex min-h-full items-center justify-center p-4 text-center"><Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"><Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"><Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">Detalles de la Pieza: {selectedPiece.name}</Dialog.Title><div className="mt-4 space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div><strong>Código:</strong> <span className="text-gray-700">{selectedPiece.code}</span></div><div><strong>Departamento:</strong> <span className="text-gray-700">{selectedPiece.departmentName}</span></div><div><strong>Cantidad:</strong> <span className="text-gray-700">{selectedPiece.quantity}</span></div><div><strong>Precio:</strong> <span className="text-gray-700">€{selectedPiece.price.toLocaleString()}</span></div></div><div className="bg-gray-50 p-4 rounded-md border"><h4 className="font-semibold text-gray-700 mb-2">Informe Adjunto:</h4><ReportDisplay report={selectedPiece.report} /></div></div><div className="mt-6 text-right"><button type="button" onClick={() => setIsReportOpen(false)} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">Cerrar</button></div></Dialog.Panel></Transition.Child></div></div></Dialog></Transition>)}

            {/* --- NUEVO MODAL PARA FILTROS AVANZADOS --- */}
            <Transition appear show={isFilterModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsFilterModalOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">Filtro Avanzado</Dialog.Title>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">Departamento</label>
                                            <select name="departmentId" value={filters.departmentId} onChange={handleFilterChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                                <option value="">Todos los departamentos</option>
                                                {departments.map(dept => (<option key={dept.id} value={dept.id}>{dept.name}</option>))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="inStock" className="block text-sm font-medium text-gray-700">Disponibilidad</label>
                                            <select name="inStock" value={filters.inStock} onChange={handleFilterChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                                <option value="">Cualquiera</option>
                                                <option value="yes">En Stock (&gt; 0)</option>
                                                <option value="no">Sin Stock (0)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end space-x-4">
                                        <button type="button" onClick={handleClearFilters} className="text-gray-700 hover:underline">Limpiar</button>
                                        <button type="button" onClick={handleApplyFilters} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none">Aplicar Filtros</button>
                                    </div>
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