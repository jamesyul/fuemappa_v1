// --- FICHERO: src/components/common/Navbar.tsx ---
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import SearchBar from './SearchBar';
import { FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link to="/select-app" className="flex items-center space-x-2">
              <img src="/logo.png" alt="FUEM Logo" className="h-9 w-auto" />
              <span className="text-gray-900 text-xl font-bold hidden sm:block">FUEM</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/pieces" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Code Assembler
                </Link>
                
                {user.role === 'admin' && (
                  <Link to="/departments" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Department Manager
                  </Link>
                )}

                {/* --- ENLACE NUEVO --- */}
                {(user.role === 'admin' || user.role === 'jefe_departamento') && (
                  <Link to="/analyzer" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Nexus CSV Data plotter
                  </Link>
                )}
                {/* --- FIN ENLACE NUEVO --- */}
                
                <SearchBar />
                
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