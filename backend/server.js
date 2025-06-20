import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pieceRoutes from './routes/pieceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import analyzerRoutes from './routes/analyzerRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// --- CONFIGURACIÓN DE CORS DEFINITIVA Y DINÁMICA ---

// 1. Lista de orígenes de confianza explícitos.
const whitelist = [
  'http://localhost:5173',      // Permitimos el desarrollo local
  process.env.FRONTEND_URL,     // Permitimos la URL de producción principal
];

const corsOptions = {
  origin: (origin, callback) => {
    // 2. Lógica dinámica:
    //    - Permite peticiones sin origen (ej. Postman).
    //    - Permite orígenes en nuestra lista blanca.
    //    - Permite CUALQUIER subdominio de Vercel (para las previews).
    if (!origin || whitelist.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true); // Origen permitido
    } else {
      // Si el origen no cumple ninguna condición, se rechaza.
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// ------------------------------------------------

app.use(express.json());

// Definición de las rutas de la API (sin cambios)
app.use('/api/pieces', pieceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/analyzer', analyzerRoutes);

// Ruta raíz para verificar que la API está funcionando
app.get('/', (req, res) => {
  res.send('FUEM Racing Inventory API is running!');
});


// Exporta la instancia de la app para que Vercel pueda usarla como una función serverless.
export default app;