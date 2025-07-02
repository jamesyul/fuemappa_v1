import { supabase } from '../config/supabase.js';

export const userModel = {
  // Obtener usuarios de un departamento específico
  getByDepartmentId: async (departmentId) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role') // ¡NUNCA selecciones la contraseña!
      .eq('departmentId', departmentId);
      
    if (error) throw new Error(error.message);
    return data;
  },
  
  // Eliminar un usuario por su ID
  deleteById: async (id) => {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Usuario eliminado con éxito' };
  },
};