import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// ... tus otros imports ...
import pieceRoutes from './routes/pieceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import analyzerRoutes from './routes/analyzerRoutes.js';

dotenv.config();

const app = express();

const whitelist = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, 
];

const corsOptions = {
  origin: (origin, callback) => {
    // --- INICIO DEL BLOQUE DE DEPURACIÓN ---
    console.log("--- INICIANDO VERIFICACIÓN DE CORS ---");
    console.log("Origen de la petición (origin):", origin);
    console.log("Variable FRONTEND_URL en Vercel:", process.env.FRONTEND_URL);
    console.log("Lista blanca (whitelist):", whitelist);
    
    const isAllowed = !origin || whitelist.includes(origin) || (origin && origin.endsWith('.vercel.app'));
    
    console.log("¿El origen está permitido?:", isAllowed);
    console.log("--- FIN DE VERIFICACIÓN DE CORS ---");
    // --- FIN DEL BLOQUE DE DEPURACIÓN ---

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// ... el resto del fichero se mantiene igual ...
app.use(express.json());
app.use('/api/pieces', pieceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/analyzer', analyzerRoutes);
app.get('/', (req, res) => { res.send('FUEM Racing Inventory API is running!'); });
export default app;