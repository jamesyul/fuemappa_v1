// --- FICHERO: backend/server.js ---
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pieceRoutes from './routes/pieceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js'; // AÑADIR

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/pieces', pieceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes); // AÑADIR

app.get('/', (req, res) => {
  res.send('FUEM Racing Inventory API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});