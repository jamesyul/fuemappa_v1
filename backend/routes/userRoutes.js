import express from 'express';
import { userController } from '../controllers/userController.js';
import { checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Solo un admin puede ver y gestionar usuarios
router.get('/department/:departmentId', checkRole(['admin']), userController.getUsersByDepartment);
router.delete('/:id', checkRole(['admin']), userController.deleteUser);

export default router;