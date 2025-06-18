import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pieces from './pages/Pieces';
import Departments from './pages/Departments';
import DataAnalyzer from './pages/DataAnalyzer';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer'; // <-- 1. Importar el Footer

const App: React.FC = () => {
  return (
    // --- 2. Mejorar el layout para empujar el footer hacia abajo ---
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow"> {/* 3. El contenido principal crece para ocupar el espacio */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pieces" element={<Pieces />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/analyzer" element={<DataAnalyzer />} />
          <Route path="*" element={<h1 className="text-center p-10">404 - Página no encontrada</h1>} />
        </Routes>
      </main>
      <Footer /> {/* 4. Renderizar el Footer al final */}
    </div>
  );
};

export default App;