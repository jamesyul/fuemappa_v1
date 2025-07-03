import { create } from 'zustand';
import { Department } from '../types/department.types';
// --- 1. Importar los servicios reales ---
import { getDepartments, createDepartment as createDeptApi, updateDepartment as updateDeptApi, deleteDepartment as deleteDeptApi } from '../services/departments.service';

interface Department {
  id: string;
  name: string;
  description?: string; // Opcional para más detalles
}

interface DepartmentsState {
  departments: Department[];
  filteredDepartments: Department[];
  fetchDepartments: () => void;
  createDepartment: (department: Department) => void;
  updateDepartment: (id: string, department: Department) => void;
  deleteDepartment: (id: string) => void;
}

export const useDepartmentsStore = create<DepartmentsState>((set) => ({
  departments: [],
  filteredDepartments: [],


    // --- 2. Implementar el FETCH real ---
  fetchDepartments: async () => {
    try {
      const departments = await getDepartments();
      set({ departments });
    } catch (error) {
      console.error("Error al obtener los departamentos:", error);
    }
  },

  // --- 3. Implementar el CREATE real ---
  createDepartment: async (departmentData) => {
    try {
      await createDeptApi(departmentData);
      // Después de crear, volvemos a pedir la lista completa para tener los datos actualizados
      await get().fetchDepartments(); 
    } catch (error) {
      console.error("Error al crear el departamento:", error);
      throw error; // Re-lanzamos el error para que el componente lo pueda manejar
    }
  },

  // --- 4. Implementar el UPDATE real ---
  updateDepartment: async (id, departmentData) => {
    try {
      await updateDeptApi(id, departmentData);
      await get().fetchDepartments();
    } catch (error) {
      console.error("Error al actualizar el departamento:", error);
      throw error;
    }
  },

  // --- 5. Implementar el DELETE real ---
  deleteDepartment: async (id) => {
    try {
      await deleteDeptApi(id);
      // En lugar de hacer fetch, podemos filtrar localmente para una respuesta más rápida
      set(state => ({
        departments: state.departments.filter(d => d.id !== id)
      }));
    } catch (error) {
      console.error("Error al eliminar el departamento:", error);
      throw error;
    }
  },
}));