// --- FICHERO: backend/routes/pieceRoutes.js ---
import express from 'express';
import { pieceController } from '../controllers/pieceController.js';
import { checkRole } from '../middleware/authMiddleware.js'; // Importamos el middleware

const router = express.Router();

// Rutas públicas (cualquier usuario logueado puede ver)
router.get('/', checkRole(['admin', 'jefe_departamento', 'integrante_departamento']), pieceController.getAllPieces);
router.get('/:id', checkRole(['admin', 'jefe_departamento', 'integrante_departamento']), pieceController.getPieceById);

// Rutas protegidas (solo admin y jefe de departamento pueden modificar)
router.post('/', checkRole(['admin', 'jefe_departamento']), pieceController.createPiece);
router.put('/:id', checkRole(['admin', 'jefe_departamento']), pieceController.updatePiece);
router.delete('/:id', checkRole(['admin', 'jefe_departamento']), pieceController.deletePiece);

export default router;