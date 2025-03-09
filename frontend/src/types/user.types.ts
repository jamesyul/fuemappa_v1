// src/types/user.types.ts
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'jefe_departamento' | 'integrante_departamento';
  departmentId?: string;
}