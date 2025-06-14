// --- FICHERO: backend/routes/authRoutes.js ---
import express from 'express';
import { authController } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup); // AÑADIR

export default router;