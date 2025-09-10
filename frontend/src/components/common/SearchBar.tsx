// --- FICHERO: src/components/common/SearchBar.tsx (VERSIÓN FINAL Y CORREGIDA) ---
import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { usePiecesStore } from '../../store/pieces.store';
import { Piece } from '../../types/piece.types';
import { questionTree, Answer } from '../../lib/diagnosticQuestions';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pieces, fetchPieces } = usePiecesStore();
  
  // Estado del asistente
  const [stepId, setStepId] = useState('INITIAL');
  const [possiblePieces, setPossiblePieces] = useState<Piece[]>([]);
  const [filters, setFilters] = useState<any>({});
  
  // Cargar las piezas solo si es necesario cuando se abre el modal
  useEffect(() => {
    if (isOpen && pieces.length === 0) {
      fetchPieces();
    }
  }, [isOpen, pieces.length, fetchPieces]);
  
  // Función para abrir el modal y reiniciar el estado del asistente
  const openModal = () => {
    setIsOpen(true);
    setStepId('INITIAL');
    setPossiblePieces(pieces); // Inicia con todas las piezas disponibles
    setFilters({});
  };
  
  const closeModal = () => setIsOpen(false);

  // --- LÓGICA CORREGIDA PARA MANEJAR LAS RESPUESTAS ---
  const handleAnswer = (answer: Answer) => {
    const currentStep = questionTree[stepId];
    if (!currentStep?.filterKey) return;
    
    // 1. Aplicar el filtro de la respuesta actual
    const newFilters = { ...filters, [currentStep.filterKey]: answer.filterValue };
    setFilters(newFilters);

    const newPossiblePieces = possiblePieces.filter(piece => {
      // Si el filtro es por código (ensamblaje), comprueba el prefijo
      if (currentStep.filterKey === 'code') {
        return piece.code.startsWith(answer.filterValue);
      }
      // Para cualquier otro filtro (como departmentId), comprueba igualdad
      const pieceValue = piece[currentStep.filterKey!];
      return pieceValue === answer.filterValue;
    });
    setPossiblePieces(newPossiblePieces);
    
    // 2. Avanzar al siguiente paso definido en la respuesta
    setStepId(answer.nextStep);
  };
  
  const currentStep = questionTree[stepId];
  // Genera las respuestas dinámicamente para el paso actual
  const answers = currentStep ? currentStep.getAnswers(possiblePieces, filters) : [];

  return (
    <>
      <button onClick={openModal} className="text-gray-700 hover:text-gray-900 p-2 rounded-md">
        <FaMagnifyingGlass size={20} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* Backdrop */}
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900 mb-4">
                    Asistente de Diagnóstico
                  </Dialog.Title>
                  
                  {stepId !== 'RESULTS' ? (
                    // --- VISTA DE PREGUNTAS ---
                    <div>
                      <p className="text-lg mb-6">{currentStep?.text}</p>
                      <div className="flex flex-col space-y-3">
                        {answers.length > 0 ? (
                          answers.map((answer, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswer(answer)}
                              className="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-indigo-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              {answer.text}
                            </button>
                          ))
                        ) : (
                          <p className="text-gray-500">No hay más preguntas para este camino. Mostrando resultados...</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    // --- VISTA DE RESULTADOS ---
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Piezas candidatas:</h4>
                      {possiblePieces.length > 0 ? (
                        <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                          {possiblePieces.map((piece) => (
                            <li key={piece.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="font-bold text-green-800">{piece.name}</p>
                              <p className="text-sm text-gray-600">Código: {piece.code}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="p-4 bg-red-50 text-red-700 rounded-lg">No se ha encontrado ninguna pieza que coincida con tus respuestas.</p>
                      )}
                      <button onClick={openModal} className="mt-6 w-full bg-gray-200 p-2 rounded-md hover:bg-gray-300 font-semibold">
                        Empezar de nuevo
                      </button>
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