// --- FICHERO: backend/routes/authRoutes.js ---
import express from 'express';
import { authController } from '../controllers/authController.js';
import { checkRole } from '../middleware/authMiddleware.js'; // <-- Importar middleware

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

// --- AÑADIR ESTA NUEVA RUTA ---
// Permite a cualquier rol autenticado obtener su perfil
router.get(
  '/profile',
  checkRole(['admin', 'jefe_departamento', 'integrante_departamento']),
  authController.getProfile
);

export default router;