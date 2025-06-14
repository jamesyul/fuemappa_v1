// --- FICHERO: backend/controllers/departmentController.js ---
import { departmentModel } from '../models/departmentModel.js';

export const departmentController = {
  // GET /api/departments
  getAllDepartments: async (req, res) => {
    try {
      const departments = await departmentModel.getAll();
      res.status(200).json(departments || []);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching departments', details: error.message });
    }
  },

  // POST /api/departments
  createDepartment: async (req, res) => {
    try {
      const newDepartment = await departmentModel.create(req.body);
      res.status(201).json(newDepartment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating department', details: error.message });
    }
  },
  
  // PUT /api/departments/:id
  updateDepartment: async (req, res) => {
    try {
      const updatedDepartment = await departmentModel.updateById(req.params.id, req.body);
      if (!updatedDepartment) return res.status(404).json({ message: 'Department not found to update' });
      res.status(200).json(updatedDepartment);
    } catch (error) {
      res.status(500).json({ message: 'Error updating department', details: error.message });
    }
  },

  // DELETE /api/departments/:id
  deleteDepartment: async (req, res) => {
    try {
      await departmentModel.deleteById(req.params.id);
      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting department', details: error.message });
    }
  },
};