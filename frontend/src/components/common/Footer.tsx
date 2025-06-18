import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    // --- CAMBIO DE ESTILO: De gris-900 a gris-800 para un tono antracita ---
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Piezas</h3>
            <ul className="space-y-2">
              <li><Link to="/pieces" className="hover:text-white">Lista de Piezas</Link></li>
              <li><Link to="/pieces/create" className="hover:text-white">Crear Pieza</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Departamentos</h3>
            <ul className="space-y-2">
              <li><Link to="/departments" className="hover:text-white">Gestionar Departamentos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><Link to="/home" className="hover:text-white">Inicio</Link></li>
              <li><Link to="/login" className="hover:text-white">Iniciar Sesión</Link></li>
              <li><Link to="/signup" className="hover:text-white">Registrarse</Link></li>
            </ul>
          </div>
        </div>
        {/* --- CAMBIO DE ESTILO: La línea divisoria ahora es más clara para que contraste --- */}
        <div className="mt-8 flex justify-between items-center border-t border-gray-700 pt-4">
          <div className="text-sm text-gray-400">
            © fuem2025 todos los derechos reservados.
          </div>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;