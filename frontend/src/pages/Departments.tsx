import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { useDepartmentsStore } from '../store/departments.store';
import { Department } from '../types/department.types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Departments: React.FC = () => {
  const [newDepartment, setNewDepartment] = useState<Department>({ id: '', name: '', description: '' });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { user } = useAuthStore(); // Eliminamos login, solo necesitamos user para verificar roles
  const { departments, fetchDepartments, createDepartment, updateDepartment, deleteDepartment } = useDepartmentsStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchDepartments();
  }, [user, navigate]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDepartment.name || !newDepartment.description) return;
    createDepartment(newDepartment);
    setNewDepartment({ id: '', name: '', description: '' });
    setIsCreateOpen(false);
  };

  const handleUpdate = (id: string, updatedDept: Department) => {
    updateDepartment(id, updatedDept);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este departamento?')) {
      deleteDepartment(id);
    }
  };

  // Verificación de roles antes de renderizar
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestionar Departamentos</h1>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Crear Departamento
        </button>
      </div>

      {/* Tabla de departamentos */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Descripción</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No hay departamentos registrados.
                </td>
              </tr>
            ) : (
              departments.map((dept: Department) => (
                <tr key={dept.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{dept.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{dept.description}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 flex space-x-2">
                    <button
                      onClick={() => {
                        const updatedDept = { ...dept, name: prompt('Nuevo nombre:', dept.name) || dept.name, description: prompt('Nueva descripción:', dept.description) || dept.description };
                        handleUpdate(dept.id, updatedDept);
                      }}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Emergente para crear departamento */}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsCreateOpen(false)} />
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
                    Crear Nuevo Departamento
                  </Dialog.Title>
                  <form onSubmit={handleCreate} className="mt-2 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre del Departamento
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={newDepartment.name}
                        onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Descripción
                      </label>
                      <textarea
                        id="description"
                        value={newDepartment.description}
                        onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      >
                        Crear
                      </button>
                      <button
                        type="button"
                        className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => setIsCreateOpen(false)}
                      >
                        Cerrar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Departments;