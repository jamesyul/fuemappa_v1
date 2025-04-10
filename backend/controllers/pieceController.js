const Piece = require('../models/pieceModel');
const multer = require('multer');
const path = require('path');

// Configurar Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Crear una nueva pieza
const createPiece = async (req, res) => {
  try {
    const { code, name, department, quantity, price, report } = req.body;
    const image = req.file ? req.file.filename : null;

    const newPiece = new Piece({
      code,
      name,
      department,
      quantity,
      price,
      report,
      image,
    });

    await newPiece.save();
    res.status(201).json(newPiece);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la pieza', error });
  }
};

// Obtener todas las piezas
const getPieces = async (req, res) => {
  try {
    const pieces = await Piece.find();
    res.status(200).json(pieces);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las piezas', error });
  }
};

module.exports = { createPiece: upload.single('image'), getPieces };