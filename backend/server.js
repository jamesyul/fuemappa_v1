// --- FICHERO: backend/server.js ---

import express from 'express';
import cors from 'cors';
//import dotenv from 'dotenv';
import pieceRoutes from './routes/pieceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import analyzerRoutes from './routes/analyzerRoutes.js';
import userRoutes from './routes/userRoutes.js';

//dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// --- 1. CONFIGURACIÓN DE CORS LIMPIA Y ROBUSTA ---
// Esta es la configuración ideal para producción y desarrollo.
const whitelist = [
  'http://localhost:5173',      // Permitido para desarrollo local
  'http://localhost:3000',      // React dev server
  'https://fuemappa-frontend.vercel.app', // Tu dominio personalizado de frontend
  'https://fuemappa-frontend-73facv0b7-jamesyuls-projects.vercel.app', // Dominio de deployment actual
  process.env.FRONTEND_URL        // Variable de entorno (ya configurada correctamente)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite peticiones sin 'origin' (como Postman) o si el origen está en la whitelist
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`CORS ERROR: El origen "${origin}" no está permitido.`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Necesario para que el frontend envíe cookies o headers de autorización
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// --- 2. LAS RUTAS DEBEN LLEVAR EL PREFIJO /api ---
// Porque este es un servidor de API independiente.
app.use('/api/pieces', pieceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/analyzer', analyzerRoutes);
app.use('/api/users', userRoutes);

// Ruta raíz para verificar que la API está funcionando
app.get('/api', (req, res) => {
  res.redirect('/api');
  res.send('FUEM Racing Inventory API is running!');
});

// --- 3. CÓDIGO PARA EJECUTAR EN LOCAL (SIN CAMBIOS, ESTÁ PERFECTO) ---
if (!process.env.VERCEL_ENV) {
  app.listen(port, () => {
    console.log(`✅ Server is running for local development on http://localhost:${port}`);
  });
}

// Exporta la app para que Vercel la use como función serverless
export default app;