export interface Piece {
  id: string;
  code: string;
  name: string;
  departmentId: string; // ID del departamento al que pertenece
  departament: string;
  quantity: number;
  price: number;
  report: string; // URL o texto del informe
  departmentName?: string; // Nombre del departamento (opcional, para mostrar en la tabla)
}