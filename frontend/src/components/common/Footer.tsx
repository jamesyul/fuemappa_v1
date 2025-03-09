import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

// Declaración de tipos para react-icons (si no existe, créalo en src/types/react-icons.d.ts)
declare module 'react-icons/fa' {
  export const FaLinkedin: React.FC<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaTwitter: React.FC<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaInstagram: React.FC<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
}

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {/* Columna 1: Piezas */}
          <div>
            <h3 className="text-white font-bold mb-4">Piezas</h3>
            <ul className="space-y-2">
              <li><Link to="/pieces" className="hover:text-white">Lista de Piezas</Link></li>
              <li><Link to="/pieces/create" className="hover:text-white">Crear Pieza</Link></li>
            </ul>
          </div>

          {/* Columna 2: Departamentos */}
          <div>
            <h3 className="text-white font-bold mb-4">Departamentos</h3>
            <ul className="space-y-2">
              <li><Link to="/departments" className="hover:text-white">Gestionar Departamentos</Link></li>
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h3 className="text-white font-bold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><Link to="/home" className="hover:text-white">Inicio</Link></li>
              <li><Link to="/login" className="hover:text-white">Iniciar Sesión</Link></li>
              <li><Link to="/signup" className="hover:text-white">Registrarse</Link></li>
            </ul>
          </div>
        </div>

        {/* Íconos de redes sociales y derechos */}
        <div className="mt-8 flex justify-between items-center border-t border-gray-800 pt-4">
          <div className="text-sm text-gray-400">
            © 2025 FUEM Ltd. All rights reserved.{' '}
            <Link to="/terms" className="hover:text-white">Términos y Condiciones</Link> |{' '}
            <Link to="/privacy" className="hover:text-white">Política de Privacidad</Link>
          </div>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
              <FaLinkedin size={20} />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;