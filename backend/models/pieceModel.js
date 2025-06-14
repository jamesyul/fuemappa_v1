// --- FICHERO: backend/models/pieceModel.js ---
import { supabase } from '../config/supabase.js';

export const pieceModel = {
  // OBTENER TODAS las piezas
  getAll: async () => {
    const { data, error } = await supabase.from('pieces').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  // OBTENER UNA pieza por su ID
  getById: async (id) => {
    const { data, error } = await supabase.from('pieces').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  },

  // CREAR una nueva pieza
  create: async (pieceData) => {
    const { data, error } = await supabase.from('pieces').insert([pieceData]).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  // ACTUALIZAR una pieza por su ID
  updateById: async (id, pieceData) => {
    const { data, error } = await supabase.from('pieces').update(pieceData).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  // ELIMINAR una pieza por su ID
  deleteById: async (id) => {
    const { error } = await supabase.from('pieces').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Piece deleted successfully' };
  },

  // BUSCAR piezas por un término
  search: async (searchTerm) => {
    // ilike es para búsqueda case-insensitive (ignora mayúsculas/minúsculas)
    const { data, error } = await supabase
      .from('pieces')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,code.ilike.%${searchTerm}%`); // Busca en nombre o código
      
    if (error) throw new Error(error.message);
    return data;
  }
};