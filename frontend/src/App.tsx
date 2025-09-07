// --- FICHERO: frontend/src/App.tsx (VERSIÓN FINAL Y CORRECTA) ---
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';

// Importa tus componentes de layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute'; // <-- El portero

// Importa tus páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AppSelector from './pages/AppSelector';
import Pieces from './pages/Pieces';
import Departments from './pages/Departments';
import DataAnalyzer from './pages/DataAnalyzer';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* --- Rutas Públicas (Cualquiera puede verlas) --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />

            {/* --- Rutas Protegidas --- */}
            {/* Todas las rutas aquí dentro requerirán que el usuario esté logueado */}
            <Route element={<ProtectedRoute />}>
              <Route path="/select-app" element={<AppSelector />} />
              <Route path="/pieces" element={<Pieces />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/analyzer" element={<DataAnalyzer />} />
            </Route>

            {/* --- Ruta para Página no Encontrada --- */}
            <Route path="*" element={<div><h2>404: Página no encontrada</h2></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;





























































































