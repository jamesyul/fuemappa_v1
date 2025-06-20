// --- FICHERO: src/components/common/SearchBar.tsx ---

import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { usePiecesStore } from '../../store/pieces.store';
import { Piece } from '../../types/piece.types';
import { useNavigate } from 'react-router-dom';

type System = 'VD' | 'EN' | 'CH/AE';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'initial' | 'system' | 'subsystem' | 'results'>('initial');
  const [initialInput, setInitialInput] = useState<string>('');
  const [filters, setFilters] = useState<{
    system?: System;
    subsystem?: string;
  }>({});
  const { pieces} = usePiecesStore();
  const [results, setResults] = useState<Piece[]>([]);
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setStep('initial');
    setInitialInput('');
    setFilters({});
    setResults([]);
  };

  // CAMBIO: Lógica de búsqueda bilingüe (español e inglés)
  useEffect(() => {
    if (initialInput && step === 'initial') {
      const lowerInput = initialInput.toLowerCase();
      let suggestedSystem: System | undefined;

      if (lowerInput.includes('frenar') || lowerInput.includes('frenos') || lowerInput.includes('brake')) {
        suggestedSystem = 'VD';
      } else if (lowerInput.includes('volante') || lowerInput.includes('girar') || lowerInput.includes('dirección') || lowerInput.includes('steering') || lowerInput.includes('turn')) {
        suggestedSystem = 'VD';
      } else if (lowerInput.includes('rueda') || lowerInput.includes('suspensión') || lowerInput.includes('wheel') || lowerInput.includes('suspension')) {
        suggestedSystem = 'VD';
      } else if (lowerInput.includes('motor') || lowerInput.includes('aceite') || lowerInput.includes('tren motriz') || lowerInput.includes('engine') || lowerInput.includes('oil') || lowerInput.includes('drivetrain')) {
        suggestedSystem = 'EN';
      } else if (lowerInput.includes('chasis') || lowerInput.includes('ala') || lowerInput.includes('aerodinámica') || lowerInput.includes('chassis') || lowerInput.includes('wing') || lowerInput.includes('aero')) {
        suggestedSystem = 'CH/AE';
      } else if (lowerInput.includes('eléctrico') || lowerInput.includes('batería') || lowerInput.includes('sensor') || lowerInput.includes('electrical') || lowerInput.includes('battery')) {
        suggestedSystem = 'EN';
      }

      if (suggestedSystem) {
        setFilters({ ...filters, system: suggestedSystem });
        setStep('system');
      }
    }
  }, [initialInput, step, filters]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialInput(e.target.value);
  };
  
  const handleNext = () => {
    filterPieces();
    setStep('results');
  };

  const filterPieces = () => {
    const filtered = pieces.filter((piece: Piece) => {
      const systemMatch = !filters.system || piece.departmentId === filters.system;
      const subsystemMatch = !filters.subsystem || piece.code.startsWith(`${filters.system}-${filters.subsystem}`);
      
      const keywordMatch = piece.name.toLowerCase().includes(initialInput.toLowerCase()) || 
                           (piece.departmentName || '').toLowerCase().includes(initialInput.toLowerCase());

      return (systemMatch && subsystemMatch) || keywordMatch;
    });
    setResults(filtered.slice(0, 5)); // Mostrar hasta 5 resultados
  };

  const subsystems: Record<System, { name: string, code: string }[]> = {
    VD: [{ name: 'Brakes', code: 'BR' }, { name: 'Steering', code: 'ST' }, { name: 'Suspension', code: 'SU' }, { name: 'Wheels & Tires', code: 'WT' }],
    EN: [{ name: 'Engine & Drivetrain', code: 'EN' }, { name: 'Electrical', code: 'EL' }],
    'CH/AE': [{ name: 'Chassis & Body', code: 'FR' }, { name: 'Misc', code: 'MS' }],
  };

  return (
    <>
      <button onClick={openModal} className="text-gray-700 hover:text-gray-900 p-2 rounded-md">
        <FaMagnifyingGlass size={20} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Buscador de Piezas
                  </Dialog.Title>
                  
                  {step === 'initial' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">¿Qué problema, pieza o síntoma buscas? (en español o inglés)</h4>
                      <input
                        type="text" value={initialInput} onChange={handleInput}
                        placeholder="Ej: 'ruido al frenar', 'brake noise', 'steering wheel'"
                        className="w-full px-3 py-2 border rounded-md mb-4"
                      />
                      <button onClick={handleNext} className="w-full bg-indigo-600 text-white p-2 rounded-md">Buscar</button>
                    </div>
                  )}

                  {step === 'system' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">Detectamos un sistema. Selecciona un subsistema para refinar.</h4>
                      <select
                        onChange={(e) => setFilters({ ...filters, subsystem: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md mb-4"
                      >
                        <option value="">Todos los subsistemas</option>
                        {subsystems[filters.system!]?.map(sub => (
                          <option key={sub.code} value={sub.code}>{sub.name}</option>
                        ))}
                      </select>
                      <button onClick={handleNext} className="w-full bg-indigo-600 text-white p-2 rounded-md">Buscar</button>
                    </div>
                  )}

                  {step === 'results' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">Resultados de la búsqueda:</h4>
                      {results.length > 0 ? (
                        <ul className="list-disc pl-5 text-gray-700">
                          {results.map((piece) => (
                            <li key={piece.id} className="mb-2">
                              {piece.name} (Código: {piece.code})
                            </li>
                          ))}
                        </ul>
                      ) : <p>No se encontraron piezas con esos criterios.</p>}
                    </div>
                  )}

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SearchBar;