// --- FICHERO: frontend/src/components/common/ProtectedRoute.tsx (NUEVO) ---
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

const ProtectedRoute: React.FC = () => {
  const { user, token } = useAuthStore(); // Usamos user o token para verificar la sesión

  // Si no hay token, la sesión no es válida, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, permite el acceso a la ruta solicitada (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;