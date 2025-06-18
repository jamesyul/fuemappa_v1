import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { useAuthStore } from './store/auth.store'; // <-- Importar store

// --- LLAMAR A LA FUNCIÓN DE VERIFICACIÓN AQUÍ ---
useAuthStore.getState().checkAuthStatus();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);