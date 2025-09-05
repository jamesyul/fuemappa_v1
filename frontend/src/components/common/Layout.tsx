// --- FICHERO: frontend/src/components/common/Layout.tsx (NUEVO) ---
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Outlet renderizará el componente de la ruta hija (ej: Pieces, Departments) */}
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;