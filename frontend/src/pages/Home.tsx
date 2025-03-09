import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Sección principal */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          FUEM Racing Team: La Fórmula de la Victoria
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
          Construimos coches de Fórmula 1 desde cero, competimos con universidades globales y buscamos talento e innovación. ¡Acelera con nosotros!
        </p>
        <div className="space-x-4 mb-8">
          <Link
            to="/signup" // Podrías redirigir a una página de registro para el equipo o patrocinios
            className="bg-black text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-800"
          >
            Únete al equipo
          </Link>
          <Link
            to="/contact" // O a una página de contacto para patrocinadores o colaboraciones
            className="border border-gray-300 text-gray-900 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100"
          >
            Contacta con nosotros
          </Link>
        </div>
      </div>

      {/* Barra inferior con íconos (ajustada) */}
      <div className="mt-12 flex space-x-4 text-gray-500 mb-16">
        <span>Innovación</span>
        <span>Competencia</span>
        <span>Tecnología</span>
      </div>

      {/* Imagen centrada */}
      <div className="mb-16 flex justify-center">
        <img
          src="/table.png" // Asegúrate de que esta imagen esté en public/
          alt="Coche de FUEM Racing Team"
          className="max-w-3xl w-full h-auto rounded-lg shadow-md" // Ajusta el tamaño y estilo según tu imagen
        />
      </div>

      {/* Sección de patrocinadores y testimonio (nueva) */}
      <div className="bg-gray-100 py-16 mt-16 w-full">
        {/* Logotipos de patrocinadores */}
        <div className="flex justify-center items-center space-x-8 mb-12">
          <img
            src="/coca-cola-logo.png" // Asegúrate de que esta imagen esté en public/
            alt="Coca-Cola"
            className="h-10 w-auto" // Ajusta el tamaño según tu logo
          />
          <img
            src="/flatfile-logo.png" // Asegúrate de que esta imagen esté en public/
            alt="Flatfile"
            className="h-10 w-auto" // Ajusta el tamaño según tu logo
          />
          <img
            src="/modal-logo.png" // Asegúrate de que esta imagen esté en public/
            alt="Modal"
            className="h-10 w-auto" // Ajusta el tamaño según tu logo
          />
          <img
            src="/usv-square-ventures-logo.png" // Asegúrate de que esta imagen esté en public/
            alt="USV Square Ventures"
            className="h-10 w-auto" // Ajusta el tamaño según tu logo
          />
          <img
            src="/replicate-logo.png" // Asegúrate de que esta imagen esté en public/
            alt="Replicate"
            className="h-10 w-auto" // Ajusta el tamaño según tu logo
          />
          <img
            src="/bravado-logo.png" // Asegúrate de que esta imagen esté en public/
            alt="Bravado"
            className="h-10 w-auto" // Ajusta el tamaño según tu logo
          />
        </div>

        {/* Testimonio */}
        <div className="text-center max-w-2xl mx-auto px-4">
          <blockquote className="text-2xl font-medium text-gray-500 italic mb-4">
            “Cuando vi por primera vez a FUEM Racing Team, supe que estaban llevando la ingeniería y la competición al siguiente nivel.”
          </blockquote>
          <p className="text-lg font-semibold text-gray-700">
            Juan Pérez - Director de Innovación - Universidad Europea de Madrid
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;