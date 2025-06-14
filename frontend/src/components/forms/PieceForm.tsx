// --- FICHERO: src/components/forms/PieceForm.tsx ---

import React, { useState, useEffect } from 'react';
import { Piece } from '../../types/piece.types';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// NUEVO: Estructura de datos basada en el PDF para la generación de códigos.
const pieceData = {
  'Vehicle Dynamics': {
    fuem_dpt: 'VD',
    systems: [
      { name: 'Brakes', code: 'BR', assemblies: [{ name: 'Balance Car', code: '01' }, { name: 'Brake Discs', code: '02' }, { name: 'Calipers', code: '09' }] },
      { name: 'Steering', code: 'ST', assemblies: [{ name: 'Steering Rack', code: '01' }, { name: 'Steering Wheel', code: '03' }] },
      { name: 'Suspension', code: 'SU', assemblies: [{ name: 'A-Arms Front Lower', code: '01' }, { name: 'Dampers', code: '11' }] },
      { name: 'Wheels & Tires', code: 'WT', assemblies: [{ name: 'Front Hubs', code: '01' }, { name: 'Tires', code: '04' }, { name: 'Wheels', code: '09' }] },
    ]
  },
  'Engine': {
    fuem_dpt: 'EN',
    systems: [
      { name: 'Engine & Drivetrain', code: 'EN', assemblies: [{ name: 'Airbox', code: '02' }, { name: 'Engine', code: '16' }, { name: 'Exhaust System', code: '20' }] },
      { name: 'Electrical', code: 'EL', assemblies: [{ name: 'Accumulator', code: '01' }, { name: 'Sensors', code: '26' }, { name: 'Wire Harness', code: '34' }] },
    ]
  },
  'Chassis & Aero': {
    fuem_dpt: 'CH/AE',
    systems: [
        { name: 'Chassis & Body', code: 'FR', assemblies: [{ name: 'Aerodynamic Wing', code: '01' }, { name: 'Chassis Assembly', code: '12' }, { name: 'Pedals', code: '25' }] },
        { name: 'Misc', code: 'MS', assemblies: [{ name: 'Driver\'s Harness', code: '01' }, { name: 'Seats', code: '07' }] },
    ]
  }
};

interface PieceFormProps {
  piece: Piece;
  allPieces: Piece[]; // NUEVO: Recibe todas las piezas para calcular el índice.
  onSubmit: (piece: Piece, imageFile?: File | null) => void;
}

const PieceForm: React.FC<PieceFormProps> = ({ piece: initialPiece, allPieces, onSubmit }) => {
  const [piece, setPiece] = useState<Piece>(initialPiece);
  // NUEVO: Estado para el generador de código.
  const [generatorState, setGeneratorState] = useState({
    department: '',
    system: '',
    assembly: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setPiece(initialPiece);
  }, [initialPiece]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "departmentName") {
        const depKey = Object.keys(pieceData).find(key => key === value) as keyof typeof pieceData | undefined;
        const departmentId = depKey ? pieceData[depKey].fuem_dpt : '';
        setPiece({ ...piece, departmentName: value, departmentId });
    } else {
        setPiece({ ...piece, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setPiece({ ...piece, report: file ? file.name : '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(piece, imageFile);
  };
  
  // CAMBIO: Lógica de generación completamente nueva.
  const handleGenerateCode = () => {
    const { system, assembly } = generatorState;
    if (!system || !assembly) {
        alert('Por favor, selecciona un Sistema y un Assembly.');
        return;
    }

    const systemCode = system;
    const assemblyCode = assembly;

    // Contar cuántas piezas de este tipo ya existen para obtener el índice.
    const existingPiecesCount = allPieces.filter(p => p.code.startsWith(`${systemCode}-${assemblyCode}-`)).length;
    const newIndex = (existingPiecesCount + 1).toString().padStart(3, '0'); // Formato "001", "002", etc.

    const newCode = `${systemCode}-${assemblyCode}-${newIndex}`;
    setPiece({ ...piece, code: newCode });
  };

  const selectedDepartmentData = pieceData[generatorState.department as keyof typeof pieceData];
  const selectedSystemData = selectedDepartmentData?.systems.find(s => s.code === generatorState.system);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-1">
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código</label>
        <div className="flex items-center space-x-2">
          <input
            type="text" id="code" name="code" value={piece.code || ''} onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Generar o introducir código" readOnly
          />
          <Popover className="relative">
            <Popover.Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Generate
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-50 mt-2 w-80 p-4 bg-white shadow-lg rounded border right-0">
                <div className="space-y-4">
                  {/* CAMBIO: Nuevos desplegables para la generación de código */}
                  <div>
                    <label className="block text-sm font-medium">Departamento</label>
                    <select
                      value={generatorState.department}
                      onChange={(e) => setGeneratorState({ department: e.target.value, system: '', assembly: '' })}
                      className="mt-1 block w-full p-2 border rounded"
                    >
                      <option value="">Selecciona Departamento</option>
                      {Object.keys(pieceData).map(dep => <option key={dep} value={dep}>{dep}</option>)}
                    </select>
                  </div>
                  
                  {generatorState.department && (
                    <div>
                      <label className="block text-sm font-medium">Sistema</label>
                      <select
                        value={generatorState.system}
                        onChange={(e) => setGeneratorState({ ...generatorState, system: e.target.value, assembly: '' })}
                        className="mt-1 block w-full p-2 border rounded"
                      >
                        <option value="">Selecciona Sistema</option>
                        {selectedDepartmentData?.systems.map(sys => <option key={sys.code} value={sys.code}>{sys.name} ({sys.code})</option>)}
                      </select>
                    </div>
                  )}

                  {generatorState.system && (
                    <div>
                      <label className="block text-sm font-medium">Assembly (Pieza)</label>
                      <select
                        value={generatorState.assembly}
                        onChange={(e) => setGeneratorState({ ...generatorState, assembly: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded"
                      >
                        <option value="">Selecciona Assembly</option>
                        {selectedSystemData?.assemblies.map(asm => <option key={asm.code} value={asm.code}>{asm.name}</option>)}
                      </select>
                    </div>
                  )}

                  <button type="button" onClick={handleGenerateCode} className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600">
                    Generar Código
                  </button>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre de Pieza</label>
        <input type="text" id="name" name="name" value={piece.name || ''} onChange={handleChange} className="block w-full p-2 border rounded" required />
      </div>
      
      <div className="space-y-1">
        <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">Departamento</label>
        <select id="departmentName" name="departmentName" value={piece.departmentName || ''} onChange={handleChange} className="block w-full p-2 border rounded" required>
            <option value="">Selecciona un departamento</option>
            {Object.keys(pieceData).map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad</label>
        <input type="number" id="quantity" name="quantity" value={piece.quantity || ''} onChange={handleChange} className="block w-full p-2 border rounded" required/>
      </div>

      <div className="space-y-1">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">€</span>
          <input type="number" id="price" name="price" value={piece.price || ''} onChange={handleChange} className="block w-full p-2 pl-8 border rounded" required/>
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Adjuntar Imagen</label>
        <div className="flex items-center space-x-2">
            <label htmlFor="image" className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                Seleccionar Imagen
            </label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden"/>
            {imageFile && <span className="text-sm text-gray-600">{imageFile.name}</span>}
        </div>
      </div>

      <button type="submit" className="w-full bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
        {initialPiece.id ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default PieceForm;