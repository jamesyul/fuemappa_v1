import React from 'react';
import { Link } from 'react-router-dom';

const AppCard = ({ to, imgSrc, title, description }: { to: string; imgSrc: string; title: string; description: string }) => (
  <Link 
    to={to} 
    className="block bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2 w-80"
  >
    <div className="p-6 flex flex-col items-center text-center">
      <img src={imgSrc} alt={title} className="h-40 w-40 object-contain mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </Link>
);

const AppSelector: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Centro de Software</h1>
        <p className="text-gray-500 mt-2">Selecciona una aplicación para comenzar.</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-10">
        <AppCard
          to="/analyzer"
          imgSrc="/CodeAssembler.png"
          title="Nexus CSV Data Plotter"
          description="Aplicación para analizar, visualizar y exportar los datos recopilados por la memoria SD de Nexus."
        />
        <AppCard
          to="/pieces"
          imgSrc="/csv_data_plotter_app_icon.png"
          title="CodeAssembler"
          description="Aplicación para gestionar y rastrear sistemas y ensamblajes de piezas."
        />
      </div>

      <div className="mt-16 text-center">
        <a href="mailto:soporte@fuem.es" className="text-sm text-gray-500 hover:text-indigo-600 hover:underline">
          Sugerir una nueva aplicación
        </a>
      </div>
    </div>
  );
};

export default AppSelector;