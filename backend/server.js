/*import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pieceRoutes from './routes/pieceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import analyzerRoutes from './routes/analyzerRoutes.js';
import userRoutes from './routes/userRoutes.js'; // <-- AÑADIR

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configuración de CORS con depuración (tu código actual, que es excelente)
const whitelist = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, 
];
const corsOptions = {
  origin: (origin, callback) => {
    console.log("--- INICIANDO VERIFICACIÓN DE CORS ---");
    console.log("Origen de la petición (origin):", origin);
    console.log("Variable FRONTEND_URL en Vercel:", process.env.FRONTEND_URL);
    console.log("Lista blanca (whitelist):", whitelist);
    
    const isAllowed = !origin || whitelist.includes(origin) || (origin && origin.endsWith('.vercel.app'));
    
    console.log("¿El origen está permitido?:", isAllowed);
    console.log("--- FIN DE VERIFICACIÓN DE CORS ---");

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Rutas de la API (sin cambios)
app.use('/api/pieces', pieceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/analyzer', analyzerRoutes);
app.use('/api/users', userRoutes); // <-- AÑADIR

// Ruta raíz
app.get('/', (req, res) => { res.send('FUEM Racing Inventory API is running!'); });


// --- AÑADIR ESTE BLOQUE AL FINAL (LA ÚNICA MODIFICACIÓN) ---
// Este código solo se ejecutará cuando corres `npm run dev` y no en Vercel.
if (!process.env.VERCEL_ENV) {
  app.listen(port, () => {
    console.log(`✅ Server is running for local development on http://localhost:${port}`);
  });
}
// -----------------------------------------------------------------


// Exporta la app para que Vercel la use como función serverless (sin cambios)
export default app;

*/












































import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import pieceRoutes from './routes/pieceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import analyzerRoutes from './routes/analyzerRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configuración de CORS
const whitelist = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
];
const corsOptions = {
  origin: (origin, callback) => {
    const isAllowed =
      !origin ||
      whitelist.includes(origin) ||
      (origin && origin.endsWith('.vercel.app'));
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Rutas de la API
app.use('/api/pieces', pieceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/analyzer', analyzerRoutes);
app.use('/api/users', userRoutes);

// --------------------
// SERVIR FRONTEND EN PRODUCCIÓN
// --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.VERCEL_ENV) {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  // Para cualquier ruta que no sea API, servir index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  // Ruta raíz solo para desarrollo
  app.get('/', (req, res) => {
    res.send('FUEM Racing Inventory API is running!');
  });
}

// Solo escuchamos localmente (en Vercel no se hace listen)
if (!process.env.VERCEL_ENV) {
  app.listen(port, () => {
    console.log(`✅ Server is running for local development on http://localhost:${port}`);
  });
}

export default app;
