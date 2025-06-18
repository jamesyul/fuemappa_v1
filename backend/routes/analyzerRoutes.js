import express from 'express';
import { analyzerController } from '../controllers/analyzerController.js';
import { checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Esta ruta solo será accesible para 'admin' y 'jefe_departamento'
router.post(
  '/process-csv',
  checkRole(['admin', 'jefe_departamento']),
  analyzerController.processCsvFromUrl
);

export default router;