import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Aplicaciones */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
              Aplicaciones
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/pieces"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Code Assembler
                </Link>
              </li>
              <li>
                <Link
                  to="/analyzer"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Nexus CSV Data Plotter
                </Link>
              </li>
              <li>
                <Link
                  to="/departments"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Department Manager
                </Link>
              </li>
            </ul>
          </div>

          {/* Acciones */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
              Acciones
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/home"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          {/* Desarrollado por */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
              Desarrollado por
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/jamesyul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-red-400 transition-colors duration-300"
                >
                  <FaGithub size={20} className="inline-block" />
                  <span>Yul Cardenas Caso</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/guti10x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-red-400 transition-colors duration-300"
                >
                  <FaGithub size={20} className="inline-block" />
                  <span>Daniel Gutiérrez Torres</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          <div className="text-sm text-gray-500">
            © fuem2025 — Todos los derechos reservados.
          </div>
          <div className="flex space-x-5 mt-4 md:mt-0">
            <a
              href="https://github.com"
              className="text-gray-400 hover:text-red-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-red-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-red-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-red-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;