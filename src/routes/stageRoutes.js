import express from 'express';
import { stageController } from '../controllers/stageController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authRolesMiddleware } from '../middlewares/authRolesMiddleware.js';

const router = express.Router();

router.get('/', stageController.getAllStages);
//curl -X GET http://localhost:3000/api/stage
router.get('/:id', stageController.getStageById);
//curl -X GET http://localhost:3000/api/stage/1
router.post('/', authMiddleware, authRolesMiddleware(['webadmin', 'producer']), stageController.createStage);
//curl -X POST http://localhost:3000/api/stage \
//-H "Content-Type: application/json" \
//-d '{
//"name": "I have no shame",
//"location": "Michigan",
//"capacity": "750"
//}'
router.put('/:id', authMiddleware, authRolesMiddleware(['webadmin', 'producer']), stageController.updateStage);
//curl -X PUT http://localhost:3000/api/stage/1 \
//-H "Content-Type: application/json" \
//-d '{
//"location": "Michigan/EUA",
//"capacity": "650"
//}'
router.delete('/:id', authMiddleware, authRolesMiddleware(['webadmin', 'producer']), stageController.deleteStage);
//curl -X DELETE http://localhost:3000/api/stage/2

export default router;