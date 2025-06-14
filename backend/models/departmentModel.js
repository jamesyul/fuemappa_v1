// --- FICHERO: backend/models/departmentModel.js ---
import { supabase } from '../config/supabase.js';

export const departmentModel = {
  getAll: async () => {
    const { data, error } = await supabase.from('departments').select('*');
    if (error) throw new Error(error.message);
    return data;
  },
  
  getById: async (id) => {
    const { data, error } = await supabase.from('departments').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  },

  create: async (deptData) => {
    const { data, error } = await supabase.from('departments').insert([deptData]).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  updateById: async (id, deptData) => {
    const { data, error } = await supabase.from('departments').update(deptData).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  deleteById: async (id) => {
    const { error } = await supabase.from('departments').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Department deleted successfully' };
  },
};