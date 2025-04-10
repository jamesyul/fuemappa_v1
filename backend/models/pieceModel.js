const mongoose = require('mongoose');

const pieceSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  report: { type: String },
  image: { type: String }, // Ruta o URL de la imagen
});

module.exports = mongoose.model('Piece', pieceSchema);