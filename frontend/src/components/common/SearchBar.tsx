// src/components/common/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6'; // Usa fa6 para Font Awesome 6
import { usePiecesStore } from '../../store/pieces.store';
import { Piece } from '../../types/piece.types';
import { useNavigate } from 'react-router-dom';

type System = 'VD' | 'EN' | 'CH/AE';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'initial' | 'system' | 'subsystem' | 'location' | 'function' | 'visual' | 'symptoms' | 'results' | 'feedback'>('initial');
  const [initialInput, setInitialInput] = useState<string>('');
  const [filters, setFilters] = useState<{
    system?: System;
    subsystem?: string;
    location?: string;
    function?: string;
    symptoms?: string[];
  }>({});
  const { pieces, setFilter } = usePiecesStore();
  const [results, setResults] = useState<Piece[]>([]);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setStep('initial');
    setInitialInput('');
    setFilters({});
    setResults([]);
    setFeedback(null);
  };

  // Identificación automática del sistema principal basado en la entrada inicial
  useEffect(() => {
    if (initialInput && step === 'initial') {
      const lowerInput = initialInput.toLowerCase();
      let suggestedSystem: System | undefined;

      if (lowerInput.includes('frenar') || lowerInput.includes('ruido al frenar') || lowerInput.includes('frenos')) {
        suggestedSystem = 'VD'; // Vehicle Dynamics (Brakes)
      } else if (lowerInput.includes('volante') || lowerInput.includes('girar') || lowerInput.includes('dirección')) {
        suggestedSystem = 'VD'; // Vehicle Dynamics (Steering)
      } else if (lowerInput.includes('rueda') || lowerInput.includes('suspensión')) {
        suggestedSystem = 'VD'; // Vehicle Dynamics (Suspension)
      } else if (lowerInput.includes('motor') || lowerInput.includes('aceite') || lowerInput.includes('tren motriz')) {
        suggestedSystem = 'EN'; // Engine
      } else if (lowerInput.includes('chasis') || lowerInput.includes('ala') || lowerInput.includes('aerodinámica')) {
        suggestedSystem = 'CH/AE'; // Chassis & Aero
      } else if (lowerInput.includes('eléctrico') || lowerInput.includes('batería') || lowerInput.includes('sensor')) {
        suggestedSystem = 'EN'; // Electrical (asociado con Engine en el documento)
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

  const handleSubmitInitial = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && initialInput) {
      const exactMatch = pieces.find(piece => piece.name.toLowerCase() === initialInput.toLowerCase());
      if (exactMatch) {
        setResults([exactMatch]);
        setStep('results');
      } else {
        setStep('system'); // Pasar a identificación del sistema si no hay coincidencia exacta
      }
    }
  };

  const handleNext = (value: string) => {
    switch (step) {
      case 'system':
        setFilters({ ...filters, system: value as System });
        setStep('subsystem');
        break;
      case 'subsystem':
        setFilters({ ...filters, subsystem: value });
        setStep('location');
        break;
      case 'location':
        setFilters({ ...filters, location: value });
        setStep('function');
        break;
      case 'function':
        setFilters({ ...filters, function: value });
        setStep('visual');
        break;
      case 'visual':
        setStep('symptoms');
        break;
      case 'symptoms':
        setFilters({ ...filters, symptoms: [value] });
        filterPieces();
        setStep('results');
        break;
      default:
        break;
    }
  };

  const filterPieces = () => {
    const filtered = pieces.filter(piece => {
      const matchesSystem = !filters.system || piece.departmentId === (filters.system === 'CH/AE' ? 'AE' : filters.system);
      const matchesSubsystem = !filters.subsystem || piece.code.startsWith(filters.subsystem.split('-')[0]);
      const matchesLocation = !filters.location || piece.name.toLowerCase().includes(filters.location.toLowerCase().includes('front') ? 'front' : filters.location.toLowerCase());
      const matchesFunction = !filters.function || piece.name.toLowerCase().includes(filters.function.toLowerCase());
      const matchesSymptoms = !filters.symptoms || filters.symptoms.some(symptom => {
        if (symptom.includes('ruido al frenar')) return piece.name.toLowerCase().includes('brake') || piece.name.toLowerCase().includes('calipers');
        if (symptom.includes('no girar')) return piece.name.toLowerCase().includes('steering');
        if (symptom.includes('vibraciones en las ruedas')) return piece.name.toLowerCase().includes('wheel') || piece.name.toLowerCase().includes('tire');
        if (symptom.includes('sobrecalentamiento del motor')) return piece.name.toLowerCase().includes('engine') || piece.name.toLowerCase().includes('cooling');
        return false;
      });
      return matchesSystem && matchesSubsystem && matchesLocation && matchesFunction && matchesSymptoms;
    });
    setResults(filtered.slice(0, 1));
  };

  const handleFeedback = (correct: boolean) => {
    setFeedback(correct);
    if (correct && results.length > 0) {
      setFilter(JSON.stringify({ code: results[0].code }));
      navigate('/pieces');
      closeModal();
    } else if (!correct) {
      setStep('initial');
      setInitialInput('');
      setFilters({});
    } else {
      closeModal();
    }
  };

  const subsystems: Record<System, string[]> = {
    VD: ['BR', 'ST', 'SU', 'WT'],
    EN: ['EN', 'EL'],
    'CH/AE': ['FR', 'MS'],
  };

  const locations = ['Front', 'Rear', 'Left', 'Right', 'Central'];
  const functions = ['Detiene el vehículo', 'Controla la dirección', 'Absorbe impactos', 'Genera potencia', 'Transmite energía'];
  const symptoms = ['El carro hace ruido al frenar', 'No puedo girar bien el volante', 'Vibraciones en las ruedas', 'Sobrecalentamiento del motor'];

  return (
    <>
      <button
        onClick={openModal}
        className="text-gray-700 hover:text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <FaMagnifyingGlass size={20} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Buscador de Piezas - {step === 'initial' ? 'Inicio' : `Paso ${step}`}
                  </Dialog.Title>
                  {step === 'initial' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">¿Qué problema, ubicación, función o pieza buscas?</h4>
                      <input
                        type="text"
                        value={initialInput}
                        onChange={handleInput}
                        onKeyPress={handleSubmitInitial}
                        placeholder="Ej: 'El carro hace ruido al frenar', 'Rueda delantera', 'No giro el volante'"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                        aria-label="Entrada inicial para buscar piezas"
                      />
                    </div>
                  )}
                  {step === 'system' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">Selecciona el sistema principal:</h4>
                      <select
                        onChange={(e) => handleNext(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                        aria-label="Selecciona un sistema"
                      >
                        <option value="">Selecciona un sistema</option>
                        <option value="VD">Vehicle Dynamics</option>
                        <option value="EN">Engine</option>
                        <option value="CH/AE">Chassis & Aero</option>
                      </select>
                    </div>
                  )}
                  {step === 'subsystem' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">Selecciona el subsistema:</h4>
                      <select
                        onChange={(e) => handleNext(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                        aria-label="Selecciona un subsistema"
                      >
                        <option value="">Selecciona un subsistema</option>
                        {subsystems[filters.system || 'VD'].map(sub => (
                          <option key={sub} value={sub}>{sub === 'BR' ? 'Brakes' : sub === 'ST' ? 'Steering' : sub === 'SU' ? 'Suspension' : sub === 'WT' ? 'Wheels' : sub === 'EN' ? 'Engine' : sub === 'EL' ? 'Electrical' : sub === 'FR' ? 'Chassis & Body' : 'Misc'}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {step === 'location' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">Selecciona la ubicación:</h4>
                      <select
                        onChange={(e) => handleNext(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                        aria-label="Selecciona una ubicación"
                      >
                        <option value="">Selecciona una ubicación</option>
                        {locations.map(loc => (
                          <option key={loc} value={loc.toLowerCase()}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {step === 'function' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">Selecciona la función:</h4>
                      <select
                        onChange={(e) => handleNext(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                        aria-label="Selecciona una función"
                      >
                        <option value="">Selecciona una función</option>
                        {functions.map(func => (
                          <option key={func} value={func.toLowerCase()}>{func}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {step === 'visual' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">Confirma visualmente la ubicación:</h4>
                      <div className="space-y-4">
                        <img
                          src="/car-schematic.png"
                          alt="Esquema del coche"
                          className="w-full h-auto rounded-md shadow-md"
                        />
                        <img
                          src="/car-real.png"
                          alt="Foto real del coche"
                          className="w-full h-auto rounded-md shadow-md"
                        />
                        <button
                          onClick={() => handleNext('confirmed')}
                          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mt-4"
                          aria-label="Confirmar ubicación visual"
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  )}
                  {step === 'symptoms' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">¿Has notado alguno de estos problemas?</h4>
                      <select
                        onChange={(e) => handleNext(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                        aria-label="Selecciona un síntoma"
                      >
                        <option value="">Selecciona un síntoma</option>
                        {symptoms.map(sym => (
                          <option key={sym} value={sym}>{sym}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {step === 'results' && results.length > 0 && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">Resultados:</h4>
                      <ul className="list-disc pl-5 text-gray-700">
                        {results.map((piece, index) => (
                          <li key={piece.id} className="mb-2">
                            {index === 0 ? 'Pieza más probable:' : 'Alternativa:'} {piece.name} (Código: {piece.code}, Departamento: {piece.departmentName ?? 'Desconocido'}, Función: {piece.name.includes('Brake') ? 'Detiene el vehículo' : piece.name.includes('Steering') ? 'Controla la dirección' : 'Otra función'})
                            <p className="text-sm text-gray-500">Descripción: {piece.name} es un componente clave para {piece.departmentName?.toLowerCase() || 'desconocido'}.</p>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setStep('feedback')}
                        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mt-4"
                        aria-label="Verificar si la pieza es correcta"
                      >
                        ¿Es correcta esta pieza?
                      </button>
                    </div>
                  )}
                  {step === 'feedback' && (
                    <div>
                      <h4 className="text-md font-semibold mb-2">¿Era esta la pieza que buscabas?</h4>
                      <div className="space-y-4">
                        <button
                          onClick={() => handleFeedback(true)}
                          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                          aria-label="Confirmar que la pieza es correcta"
                        >
                          Sí
                        </button>
                        <button
                          onClick={() => handleFeedback(false)}
                          className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                          aria-label="Indicar que la pieza no es correcta"
                        >
                          No
                        </button>
                      </div>
                      {feedback === false && (
                        <p className="text-sm text-gray-500 mt-4">Proporciona más detalles o reinicia la búsqueda.</p>
                      )}
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