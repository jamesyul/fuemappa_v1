// --- FICHERO: frontend/src/App.tsx (IMPORTACIONES FINALES Y CORRECTAS) ---
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/auth.store'; // './' significa "desde la misma carpeta (src)"

// Importa componentes desde su ruta relativa
import Layout from './components/common/Layout'; 
import ProtectedRoute from './components/common/ProtectedRoute';

// Importa páginas desde su ruta relativa
import Home from './pages/Home';
import Login from './pages-Login';
import Signup from './pages/Signup';
import AppSelector from './pages/AppSelector';
import Pieces from './pages/Pieces';
import Departments from './pages/Departments';
import DataAnalyzer from './pages/DataAnalyzer';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const { checkAuthStatus } = useAuthStore();

  // Al cargar la app, verifica si hay una sesión activa
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <Router>
      <Routes>
        {/* --- Rutas con Layout (Navbar y Footer) --- */}
        <Route element={<Layout />}>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/select-app" element={<AppSelector />} />
            <Route path="/pieces" element={<Pieces />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/analyzer" element={<DataAnalyzer />} />
          </Route>
        </Route>

        {/* --- Rutas sin Layout (ej: Login, que es a pantalla completa) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* --- Ruta para Página no Encontrada --- */}
        <Route path="*" element={<div><h2>404: Página no encontrada</h2></div>} />
      </Routes>
    </Router>
  );
};

export default App;

















































