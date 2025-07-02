import { userModel } from '../models/userModel.js';

export const userController = {
  // GET /api/users/department/:departmentId
  getUsersByDepartment: async (req, res) => {
    try {
      const users = await userModel.getByDepartmentId(req.params.departmentId);
      res.status(200).json(users || []);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios del departamento', details: error.message });
    }
  },

  // DELETE /api/users/:id
  deleteUser: async (req, res) => {
    try {
        // Podríamos añadir lógica para que un admin no se pueda auto-eliminar, pero lo mantenemos simple.
        await userModel.deleteById(req.params.id);
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', details: error.message });
    }
  },
  // Nota: La creación y edición se manejan vía /signup o futuras implementaciones más complejas.
};