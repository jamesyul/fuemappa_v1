// --- FICHERO: backend/routes/departmentRoutes.js ---
import express from 'express';
import { departmentController } from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', departmentController.getAllDepartments);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

export default router;