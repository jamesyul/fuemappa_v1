// --- FICHERO: backend/routes/pieceRoutes.js ---
import express from 'express';
import { pieceController } from '../controllers/pieceController.js';

const router = express.Router();

router.get('/', pieceController.getAllPieces);       // Obtener todas o buscar
router.post('/', pieceController.createPiece);       // Crear una pieza
router.get('/:id', pieceController.getPieceById);    // Obtener una pieza por ID
router.put('/:id', pieceController.updatePiece);     // Actualizar una pieza por ID
router.delete('/:id', pieceController.deletePiece);  // Eliminar una pieza por ID

export default router;