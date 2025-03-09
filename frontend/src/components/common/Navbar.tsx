// src/components/common/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import SearchBar from './SearchBar'; // Importa SearchBar

const Navbar: React.FC = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Simulación temporal de un usuario admin para pruebas (borra esto en producción)
  //useEffect(() => {
    // login({ id: '1', name: 'yul', role: 'admin' });
  //}, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y texto FUEM */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link to="/">
              <img src="/logo.png" alt="FUEM Logo" className="h-8 w-auto" />
            </Link>
            <span className="text-gray-900 text-xl font-bold">FUEM</span>
          </div>

          {/* Enlaces y botones */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* "Piezas" visible para todos los usuarios autenticados */}
                <Link to="/pieces" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Piezas
                </Link>
                {/* "Departamentos" solo para admin */}
                {user.role === 'admin' && (
                  <Link to="/departments" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Departamentos
                  </Link>
                )}
                {/* Buscador accesible para todos los usuarios autenticados */}
                <SearchBar />
                {/* Botón de "Cerrar Sesión" para todos los usuarios autenticados */}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Iniciar Sesión
                </Link>
                <Link to="/signup" className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;