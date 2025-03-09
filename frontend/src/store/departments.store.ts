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
    { id: 'd1', name: 'Vehicle Dynamics', description: 'Departamento de dinámica vehicular para sistemas de frenado, suspensión y dirección.' },
    { id: 'd2', name: 'Engine', description: 'Departamento de motor y tren motriz para sistemas de motor, eléctrico y transmisión.' },
    { id: 'd3', name: 'Aero', description: 'Departamento de aerodinámica para alas, alerones y componentes aerodinámicos del coche.' },
    { id: 'd4', name: 'Chassis', description: 'Departamento de chasis y carrocería para estructuras, ensamblajes y acabados del vehículo.' },
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