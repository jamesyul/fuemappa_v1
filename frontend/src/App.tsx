import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pieces from './pages/Pieces';
import Departments from './pages/Departments';
import DataAnalyzer from './pages/DataAnalyzer'; // <-- AÑADIR
import Navbar from './components/common/Navbar';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pieces" element={<Pieces />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/analyzer" element={<DataAnalyzer />} /> {/* <-- AÑADIR */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </div>
  );
};

export default App;