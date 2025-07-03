// --- FICHERO: backend/routes/departmentRoutes.js ---
import express from 'express';
import { departmentController } from '../controllers/departmentController.js';
import { checkRole } from '../middleware/authMiddleware.js'; // Importar middleware

const router = express.Router();

/*router.get('/', departmentController.getAllDepartments);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);
*/
// --- PROTEGER RUTAS ---
router.get('/', checkRole(['admin', 'jefe_departamento', 'integrante_departamento']), departmentController.getAllDepartments);
router.post('/', checkRole(['admin']), departmentController.createDepartment); // Solo admin crea
router.put('/:id', checkRole(['admin']), departmentController.updateDepartment); // Solo admin edita
router.delete('/:id', checkRole(['admin']), departmentController.deleteDepartment); // Solo admin elimina
export default router;

