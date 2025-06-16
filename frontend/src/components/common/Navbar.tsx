// --- FICHERO: src/components/common/Navbar.tsx ---
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import SearchBar from './SearchBar';
import { FaUserCircle } from 'react-icons/fa'; // Un ícono para el usuario

const Navbar: React.FC = () => {
  // Obtenemos los datos del usuario y las funciones del store de Zustand
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigimos al login después de cerrar sesión
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Nombre del Equipo */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="FUEM Logo" className="h-9 w-auto" />
              <span className="text-gray-900 text-xl font-bold hidden sm:block">FUEM</span>
            </Link>
          </div>

          {/* Enlaces y Botones */}
          <div className="flex items-center space-x-4">
            {user ? (
              // --- VISTA PARA USUARIOS AUTENTICADOS ---
              <>
                {/* Enlace a Piezas (visible para todos los logueados) */}
                <Link to="/pieces" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Piezas
                </Link>
                
                {/* Enlace a Departamentos (SÓLO visible para administradores) */}
                {user.role === 'admin' && (
                  <Link to="/departments" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Departamentos
                  </Link>
                )}
                
                {/* Buscador (visible para todos los logueados) */}
                <SearchBar />
                
                {/* Información del Usuario y Botón de Logout */}
                <div className="flex items-center space-x-2">
                    <FaUserCircle className="text-gray-500" size={20} />
                    <span className="text-sm font-medium text-gray-700 hidden md:block">{user.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              // --- VISTA PARA USUARIOS NO AUTENTICADOS ---
              <>
                <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Iniciar Sesión
                </Link>
                <Link to="/signup" className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
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