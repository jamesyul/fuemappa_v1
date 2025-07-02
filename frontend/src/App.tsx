import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pieces from './pages/Pieces';
import Departments from './pages/Departments';
import DataAnalyzer from './pages/DataAnalyzer';
import AppSelector from './pages/AppSelector'; // <-- 1. Importar la nueva página
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Contact from './pages/Contact'; 

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-app" element={<AppSelector />} /> {/* <-- 2. Añadir la nueva ruta */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pieces" element={<Pieces />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/analyzer" element={<DataAnalyzer />} />
          <Route path="/contact" element={<Contact />} /> {/* <-- Añadir la nueva ruta */}
          <Route path="*" element={<h1 className="text-center p-10">404 - Página no encontrada</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;


