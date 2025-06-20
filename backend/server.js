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

const whitelist = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, // https://fuemappa-v1.vercel.app/
];

const corsOptions = {
  origin: (origin, callback) => {
    // Si NO llega origin (Postman) ➔ permitir
    // Si llega y está en la whitelist ➔ permitir
    // Si llega y es una URL de Vercel ➔ permitir
    if (
      !origin ||
      whitelist.includes(origin) ||
      origin.includes('.vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Tus middlewares y rutas
app.use(express.json());

app.use('/api/pieces', pieceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/analyzer', analyzerRoutes);

app.get('/', (req, res) => {
  res.send('FUEM Racing Inventory API is running!');
});

export default app;
