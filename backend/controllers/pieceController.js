// --- FICHERO: backend/controllers/pieceController.js ---
import { pieceModel } from '../models/pieceModel.js';

export const pieceController = {
  // GET /api/pieces
  getAllPieces: async (req, res) => {
    try {
      // Si hay un término de búsqueda en la query (ej: /api/pieces?search=rueda)
      if (req.query.search) {
        const pieces = await pieceModel.search(req.query.search);
        return res.status(200).json(pieces || []);
      }
      const pieces = await pieceModel.getAll();
      res.status(200).json(pieces || []);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching pieces', details: error.message });
    }
  },

  // GET /api/pieces/:id
  getPieceById: async (req, res) => {
    try {
      const piece = await pieceModel.getById(req.params.id);
      if (!piece) return res.status(404).json({ message: 'Piece not found' });
      res.status(200).json(piece);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching piece', details: error.message });
    }
  },

  // POST /api/pieces
  createPiece: async (req, res) => {
    try {
      // Aquí se asumiría que la URL de la imagen ya viene en el body.
      // Un manejo más avanzado se haría con multer y Supabase Storage.
      const newPiece = await pieceModel.create(req.body);
      res.status(201).json(newPiece);
    } catch (error) {
      res.status(500).json({ message: 'Error creating piece', details: error.message });
    }
  },

  // PUT /api/pieces/:id
  updatePiece: async (req, res) => {
    try {
      const updatedPiece = await pieceModel.updateById(req.params.id, req.body);
      if (!updatedPiece) return res.status(404).json({ message: 'Piece not found to update' });
      res.status(200).json(updatedPiece);
    } catch (error) {
      res.status(500).json({ message: 'Error updating piece', details: error.message });
    }
  },

  // DELETE /api/pieces/:id
  deletePiece: async (req, res) => {
    try {
      await pieceModel.deleteById(req.params.id);
      res.status(200).json({ message: 'Piece deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting piece', details: error.message });
    }
  },
};