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

// Configuración de CORS más robusta para producción y desarrollo
const whitelist = [
  'http://localhost:5173', // URL de desarrollo del frontend
  process.env.FRONTEND_URL, // URL de producción del frontend (desde .env)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite peticiones sin 'origin' (como las de Postman o apps móviles) o si el origen está en la lista blanca
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Si en el futuro usas cookies o sesiones más complejas
};

app.use(cors(corsOptions));
app.use(express.json());

// Definición de las rutas de la API
app.use('/api/pieces', pieceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/analyzer', analyzerRoutes);

// Ruta raíz para verificar que la API está funcionando
app.get('/', (req, res) => {
  res.send('FUEM Racing Inventory API is running!');
});

// Este bloque permite que el servidor se ejecute localmente con "npm run dev",
// pero no interferirá con Vercel porque Vercel no ejecuta este fichero directamente.
// Vercel solo importa el 'export default app'.
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running for local development on http://localhost:${port}`);
  });
}

// Exporta la instancia de la app para que Vercel pueda usarla como una función serverless.
export default app;