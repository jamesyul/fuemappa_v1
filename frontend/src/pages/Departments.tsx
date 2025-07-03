import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { useDepartmentsStore } from '../store/departments.store';
import { Department } from '../types/department.types';
import { User } from '../types/user.types';
import { getUsersByDepartment, deleteUser } from '../services/user.service';
import { Dialog, Transition } from '@headlessui/react';

const Departments: React.FC = () => {
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '' });
  //const [newDepartment, setNewDepartment] = useState<Department>({ id: '', name: '', description: '' });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { user } = useAuthStore();
  const { departments, fetchDepartments, createDepartment, updateDepartment, deleteDepartment } = useDepartmentsStore();
  //const { departments, fetchDepartments, createDepartment, updateDepartment, deleteDepartment: deleteDept } = useDepartmentsStore();
  const navigate = useNavigate();

  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [departmentUsers, setDepartmentUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    fetchDepartments();
  }, [user, navigate, fetchDepartments]);
  
  /*const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDepartment.name || !newDepartment.description) return;
    createDepartment(newDepartment);
    setNewDepartment({ id: '', name: '', description: '' });
    setIsCreateOpen(false);
  };

  const handleUpdate = (id: string, updatedDept: Department) => {
    updateDepartment(id, updatedDept);
  };

  const handleDeleteDept = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este departamento?')) {
      deleteDept(id);
    }
  };*/
   const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDepartment.name) return;
    try {
        await createDepartment(newDepartment);
        alert('Departamento creado con éxito');
        setNewDepartment({ name: '', description: '' });
        setIsCreateOpen(false);
    } catch (error) {
        alert('Error al crear el departamento.');
    }
  };

  const handleUpdate = async (id: string) => {
    const newName = prompt('Nuevo nombre:', departments.find(d => d.id === id)?.name);
    if (!newName) return;
    try {
        await updateDepartment(id, { name: newName });
        alert('Departamento actualizado.');
    } catch (error) {
        alert('Error al actualizar.');
    }
  };

  const handleDeleteDept = async (id: string) => {
    if (window.confirm('¿Seguro que quieres eliminar este departamento?')) {
        try {
            await deleteDepartment(id);
            alert('Departamento eliminado.');
        } catch (error) {
            alert('Error al eliminar.');
        }
    }
  };

  const handleViewUsers = async (department: Department) => {
    setSelectedDept(department);
    setIsUsersModalOpen(true);
    setIsLoadingUsers(true);
    try {
      const users = await getUsersByDepartment(department.id);
      setDepartmentUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("No se pudo cargar la lista de usuarios.");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este usuario permanentemente?')) {
        try {
            await deleteUser(userId);
            alert('Usuario eliminado.');
            setDepartmentUsers(departmentUsers.filter(u => u.id !== userId));
        } catch (error) {
            alert('Error al eliminar el usuario.');
        }
    }
  }

  if (!user || user.role !== 'admin') { return null; }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestionar Departamentos</h1>
        <button onClick={() => setIsCreateOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Crear Departamento
        </button>
      </div>

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
            {departments.map((dept) => (
              <tr key={dept.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{dept.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{dept.description}</td>
                <td className="py-3 px-4 text-sm text-gray-700 flex space-x-4">
                  <button onClick={() => handleUpdate(dept.id, { ...dept, name: prompt('Nuevo nombre:', dept.name) || dept.name })} className="text-indigo-600 hover:text-indigo-800">Editar</button>
                  <button onClick={() => handleDeleteDept(dept.id)} className="text-red-600 hover:text-red-800">Eliminar</button>
                  <button onClick={() => handleViewUsers(dept)} className="text-green-600 hover:text-green-800">Ver Usuarios</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL PARA CREAR DEPARTAMENTO (INCLUIDO) --- */}
      <Transition appear show={isCreateOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsCreateOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Crear Nuevo Departamento</Dialog.Title>
                  <form onSubmit={handleCreate} className="mt-2 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Departamento</label>
                      <input type="text" id="name" value={newDepartment.name} onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                      <textarea id="description" value={newDepartment.description} onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">Crear</button>
                      <button type="button" className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2" onClick={() => setIsCreateOpen(false)}>Cerrar</button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* --- MODAL PARA GESTIONAR USUARIOS (INCLUIDO) --- */}
      {selectedDept && (
        <Transition appear show={isUsersModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-20" onClose={() => setIsUsersModalOpen(false)}>
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" /></Transition.Child>
            <div className="fixed inset-0 overflow-y-auto"><div className="flex min-h-full items-center justify-center p-4"><Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900 mb-4">Usuarios en: {selectedDept.name}</Dialog.Title>
                    {isLoadingUsers ? <p>Cargando usuarios...</p> :
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50"><tr><th className="p-2">Nombre</th><th className="p-2">Email</th><th className="p-2">Rol</th><th className="p-2">Acciones</th></tr></thead>
                            <tbody>
                                {departmentUsers.map(u => (
                                    <tr key={u.id} className="border-b"><td className="p-2">{u.name}</td><td className="p-2">{u.email}</td><td className="p-2">{u.role}</td><td className="p-2">
                                        <button className="text-indigo-600 mr-2">Editar</button>
                                        <button onClick={() => handleDeleteUser(u.id)} className="text-red-600">Eliminar</button>
                                    </td></tr>
                                ))}
                            </tbody>
                        </table>
                    }
                    <div className="mt-4 flex justify-end space-x-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm">Crear Usuario</button>
                        <button onClick={() => setIsUsersModalOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm">Cerrar</button>
                    </div>
                </Dialog.Panel>
            </Transition.Child></div></div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default Departments;