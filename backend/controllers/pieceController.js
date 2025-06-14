const supabase = require('../config/supabase');

const createPiece = async (req, res) => {
  try {
    const { code, name, department, quantity, price, report } = req.body;
    const { data, error } = await supabase
      .from('pieces')
      .insert([{ code, name, department, quantity, price, report }]);

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la pieza', error });
  }
};

const getPieces = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pieces')
      .select('*');

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las piezas', error });
  }
};

module.exports = { createPiece, getPieces };