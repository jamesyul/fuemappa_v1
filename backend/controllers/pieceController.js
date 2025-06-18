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

  // --- FUNCIÓN DE CREAR CORREGIDA ---
  createPiece: async (req, res) => {
    try {
      const dataToInsert = { ...req.body };
      
      // REGLA DE NEGOCIO: Si el usuario es un jefe, FORZAMOS
      // que la pieza se cree en su propio departamento, ignorando lo que envíe el frontend.
      if (req.user.role === 'jefe_departamento') {
        dataToInsert.departmentId = req.user.departmentId;
      }
      // Un admin puede crear piezas para cualquier departamento, así que confiamos en el `departmentId` que envía.

      const newPiece = await pieceModel.create(dataToInsert);
      res.status(201).json(newPiece);
    } catch (error) {
      console.error("CREATE PIECE ERROR:", error.message); // Log para depuración
      res.status(500).json({ message: 'Error creating piece', details: error.message });
    }
  },

  // --- FUNCIÓN DE ACTUALIZAR CORREGIDA ---
  updatePiece: async (req, res) => {
    try {
        const pieceId = req.params.id;
        const dataToUpdate = { ...req.body };

        // REGLA DE NEGOCIO: Si es un jefe, solo puede actualizar piezas de su depto.
        // Y no puede cambiar la pieza a otro departamento.
        if (req.user.role === 'jefe_departamento') {
            const piece = await pieceModel.getById(pieceId);
            if (!piece || piece.departmentId !== req.user.departmentId) {
                return res.status(403).json({ message: 'Acceso prohibido: No puedes modificar piezas de otros departamentos.' });
            }
            // Aseguramos que no se cambie de departamento
            dataToUpdate.departmentId = req.user.departmentId;
        }

      const updatedPiece = await pieceModel.updateById(pieceId, dataToUpdate);
      if (!updatedPiece) return res.status(404).json({ message: 'Pieza no encontrada para actualizar' });
      res.status(200).json(updatedPiece);
    } catch (error) {
      res.status(500).json({ message: 'Error updating piece', details: error.message });
    }
  },

  // --- FUNCIÓN DE ELIMINAR CORREGIDA ---
  deletePiece: async (req, res) => {
    try {
        const pieceId = req.params.id;

        if (req.user.role === 'jefe_departamento') {
            const piece = await pieceModel.getById(pieceId);
            if (!piece || piece.departmentId !== req.user.departmentId) {
                return res.status(403).json({ message: 'Acceso prohibido: No puedes eliminar piezas de otros departamentos.' });
            }
        }

      await pieceModel.deleteById(pieceId);
      res.status(200).json({ message: 'Pieza eliminada con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting piece', details: error.message });
    }
  },
};