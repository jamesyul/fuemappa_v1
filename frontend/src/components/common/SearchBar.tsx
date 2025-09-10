// --- FICHERO: src/components/common/SearchBar.tsx (VERSIÓN AKINATOR 2.0) ---
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
  
  useEffect(() => {
    if (isOpen && pieces.length === 0) {
      fetchPieces();
    }
  }, [isOpen, pieces, fetchPieces]);
  
  const openModal = () => {
    setIsOpen(true);
    setStepId('INITIAL');
    setPossiblePieces(pieces);
    setFilters({});
  };
  
  const closeModal = () => setIsOpen(false);

  const handleAnswer = (answer: Answer) => {
    const currentStep = questionTree[stepId];
    if (!currentStep.filterKey) return;
    
    // 1. Aplicar el filtro de la respuesta actual
    const newFilters = { ...filters, [currentStep.filterKey]: answer.filterValue };
    setFilters(newFilters);

    const newPossiblePieces = possiblePieces.filter(piece => {
      if (currentStep.filterKey === 'code') {
        // Filtro especial para código de ensamblaje
        return piece.code.startsWith(answer.filterValue);
      }
      return piece[currentStep.filterKey!] === answer.filterValue;
    });
    setPossiblePieces(newPossiblePieces);
    
    // 2. Avanzar al siguiente paso
    setStepId(answer.nextStep);
  };
  
  const currentStep = questionTree[stepId];
  const answers = currentStep ? currentStep.getAnswers(possiblePieces, filters) : [];

  return (
    <>
      <button onClick={openModal} className="text-gray-700 hover:text-gray-900 p-2 rounded-md">
        <FaMagnifyingGlass size={20} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900 mb-4">
                Asistente de Diagnóstico
              </Dialog.Title>
              
              {stepId !== 'RESULTS' ? (
                // --- VISTA DE PREGUNTAS ---
                <div>
                  <p className="text-lg mb-6">{currentStep?.text}</p>
                  <div className="flex flex-col space-y-3">
                    {answers.map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(answer)}
                        className="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-indigo-500 hover:text-white transition-colors"
                      >
                        {answer.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // --- VISTA DE RESULTADOS ---
                <div>
                  <h4 className="text-lg font-semibold mb-4">Piezas candidatas:</h4>
                  {possiblePieces.length > 0 ? (
                    <ul className="space-y-3 max-h-60 overflow-y-auto">
                      {possiblePieces.map((piece) => (
                        <li key={piece.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="font-bold text-green-800">{piece.name}</p>
                          <p className="text-sm text-gray-600">Código: {piece.code}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-4 bg-red-50 text-red-700 rounded-lg">No se ha encontrado ninguna pieza que coincida.</p>
                  )}
                  <button onClick={openModal} className="mt-6 w-full bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                    Empezar de nuevo
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SearchBar;