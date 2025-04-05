import React, { useState, useEffect } from 'react';
import { Piece } from '../../types/piece.types';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Lista de departamentos con prefijos para el código
const departments = [
  { value: 'engine', label: 'Engine', prefix: 'EN' },
  { value: 'transmission', label: 'Transmission', prefix: 'TR' },
  { value: 'vehicle_dynamics', label: 'Vehicle Dynamics', prefix: 'VD' },
  { value: 'aero', label: 'Aero', prefix: 'AE' },
  { value: 'chassis', label: 'Chassis', prefix: 'CH' },
];

// Opciones de subcategoría (personalízalas según tu proyecto)
const subcategories = [
  { value: '01', label: 'Componente Principal' },
  { value: '02', label: 'Accesorio' },
  { value: '03', label: 'Repuesto' },
];

interface PieceFormProps {
  piece: Piece;
  onSubmit: (piece: Piece) => void;
}

const PieceForm: React.FC<PieceFormProps> = ({ piece: initialPiece, onSubmit }) => {
  const [piece, setPiece] = useState<Piece>(initialPiece);
  const [generateOptions, setGenerateOptions] = useState({
    department: initialPiece.departmentId || '',
    subcategory: '',
    year: new Date().getFullYear().toString().slice(-2),
    serial: '001',
  });

  useEffect(() => {
    setPiece(initialPiece);
  }, [initialPiece]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPiece({ ...piece, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(piece);
  };

  const handleGenerateCode = () => {
    const selectedDep = departments.find(dep => dep.value === generateOptions.department);
    if (selectedDep) {
      const code = `${selectedDep.prefix}-${generateOptions.subcategory || '00'}-${generateOptions.year}-${generateOptions.serial}`;
      setPiece({ ...piece, code });
    } else {
      alert('Por favor, selecciona un departamento.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo Código con botón Generate */}
      <div className="space-y-1">
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Código
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="code"
            name="code"
            value={piece.code || ''}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Código de la pieza"
          />
          <Popover className="relative">
            <Popover.Button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Generate
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-50 mt-2 w-80 p-4 bg-white shadow-lg rounded border right-0">
                <div className="space-y-4">
                  {/* Combobox Departamento */}
                  <div>
                    <label htmlFor="generateDepartment" className="block text-sm font-medium text-gray-700">
                      Departamento
                    </label>
                    <select
                      id="generateDepartment"
                      value={generateOptions.department}
                      onChange={(e) => setGenerateOptions({ ...generateOptions, department: e.target.value })}
                      className="mt-1 block w-full p-2 border rounded"
                    >
                      <option value="">Selecciona un departamento</option>
                      {departments.map(dep => (
                        <option key={dep.value} value={dep.value}>
                          {dep.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Combobox Subcategoría */}
                  <div>
                    <label htmlFor="generateSubcategory" className="block text-sm font-medium text-gray-700">
                      Subcategoría
                    </label>
                    <select
                      id="generateSubcategory"
                      value={generateOptions.subcategory}
                      onChange={(e) => setGenerateOptions({ ...generateOptions, subcategory: e.target.value })}
                      className="mt-1 block w-full p-2 border rounded"
                    >
                      <option value="">Selecciona una subcategoría</option>
                      {subcategories.map(sub => (
                        <option key={sub.value} value={sub.value}>
                          {sub.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Combobox Año */}
                  <div>
                    <label htmlFor="generateYear" className="block text-sm font-medium text-gray-700">
                      Año
                    </label>
                    <select
                      id="generateYear"
                      value={generateOptions.year}
                      onChange={(e) => setGenerateOptions({ ...generateOptions, year: e.target.value })}
                      className="mt-1 block w-full p-2 border rounded"
                    >
                      <option value={new Date().getFullYear().toString().slice(-2)}>
                        {new Date().getFullYear().toString().slice(-2)}
                      </option>
                      <option value={(new Date().getFullYear() - 1).toString().slice(-2)}>
                        {(new Date().getFullYear() - 1).toString().slice(-2)}
                      </option>
                    </select>
                  </div>
                  {/* Combobox Número de Serie */}
                  <div>
                    <label htmlFor="generateSerial" className="block text-sm font-medium text-gray-700">
                      Número de Serie
                    </label>
                    <select
                      id="generateSerial"
                      value={generateOptions.serial}
                      onChange={(e) => setGenerateOptions({ ...generateOptions, serial: e.target.value })}
                      className="mt-1 block w-full p-2 border rounded"
                    >
                      <option value="001">001</option>
                      <option value="002">002</option>
                      <option value="003">003</option>
                    </select>
                  </div>
                  {/* Botón Generar */}
                  <button
                    onClick={handleGenerateCode}
                    className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
                  >
                    Generar
                  </button>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>

      {/* Campo Nombre de Pieza */}
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre de Pieza
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={piece.name || ''}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre de la pieza"
        />
      </div>

      {/* Dropdown Departamento */}
      <div className="space-y-1">
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Departamento
        </label>
        <select
          id="department"
          name="departmentId"
          value={piece.departmentId || ''}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona un departamento</option>
          <option value="d1">Engine</option>
          <option value="d2">Transmission</option>
          <option value="d3">Vehicle Dynamics</option>
          <option value="d4">Aero</option>
          <option value="d5">Chassis</option>
        </select>
      </div>

      {/* Campo Cantidad */}
      <div className="space-y-1">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Cantidad
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={piece.quantity || ''}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Cantidad"
        />
      </div>

      {/* Campo Precio */}
      <div className="space-y-1">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Precio
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={piece.price || ''}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Precio"
        />
      </div>

      {/* Campo Informe */}
      <div className="space-y-1">
        <label htmlFor="report" className="block text-sm font-medium text-gray-700">
          Informe (URL o texto)
        </label>
        <input
          type="text"
          id="report"
          name="report"
          value={piece.report || ''}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Informe"
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition-colors"
      >
        {initialPiece.id ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default PieceForm;