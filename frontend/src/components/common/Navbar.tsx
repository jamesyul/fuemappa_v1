// --- FICHERO: src/components/common/Navbar.tsx ---
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import SearchBar from './SearchBar';
import { FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation(); // Hook para saber en qué página estamos

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determina si estamos en la página del selector de aplicaciones
  const isAppSelectorPage = location.pathname === '/select-app';

  // Lógica para el enlace del logo
  const logoLink = user ? '/select-app' : '/';

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link to={logoLink} className="flex items-center space-x-2">
              <img src="/logo.png" alt="FUEM Logo" className="h-9 w-auto" />
              <span className="text-gray-900 text-xl font-bold hidden sm:block">FUEM</span>
            </Link>
          </div>

          {/* Menú de Navegación */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Oculta los enlaces principales si estamos en el AppSelector */}
                {!isAppSelectorPage && (
                  <>
                    <Link to="/pieces" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Piezas
                    </Link>
                    
                    {user.role === 'admin' && (
                      <Link to="/departments" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                        Departamentos
                      </Link>
                    )}

                    {(user.role === 'admin' || user.role === 'jefe_departamento') && (
                      <Link to="/analyzer" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                        Analizador
                      </Link>
                    )}
                  </>
                )}
                
                {/* Estos se muestran siempre si el usuario está logueado */}
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