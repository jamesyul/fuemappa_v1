import { create } from 'zustand';

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
  departments: [
    { id: 'VD', name: 'Vehicle Dynamics', description: 'Departamento de dinámica vehicular...' },
    { id: 'EN', name: 'Engine', description: 'Departamento de motor y tren motriz...' },
    { id: 'CH/AE', name: 'Chassis & Aero', description: 'Departamento de chasis y aerodinámica...' },
  ],
  filteredDepartments: [],
  fetchDepartments: () => set((state) => ({ departments: state.departments, filteredDepartments: state.departments })),
  createDepartment: (department) => set((state) => ({
    departments: [...state.departments, { ...department, id: Date.now().toString() }],
    filteredDepartments: [...state.departments, { ...department, id: Date.now().toString() }],
  })),
  updateDepartment: (id, department) => set((state) => ({
    departments: state.departments.map(d => d.id === id ? { ...d, ...department } : d),
    filteredDepartments: state.departments.map(d => d.id === id ? { ...d, ...department } : d),
  })),
  deleteDepartment: (id) => set((state) => ({
    departments: state.departments.filter(d => d.id !== id),
    filteredDepartments: state.departments.filter(d => d.id !== id),
  })),
}));