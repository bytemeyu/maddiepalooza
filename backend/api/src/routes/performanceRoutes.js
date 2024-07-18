import express from 'express';
import { performanceController } from '../controllers/performanceController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authRolesMiddleware } from '../middlewares/authRolesMiddleware.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', performanceController.getAllPerformances);
//curl -X GET http://localhost:3000/api/performance
router.get('/:id', performanceController.getPerformanceById);
//curl -X GET http://localhost:3000/api/performance/1
router.post('/', validationMiddleware.validatePerformanceCreationAndUpdate, authMiddleware, authRolesMiddleware(['webadmin', 'producer', 'assistant']), performanceController.createPerformance);
//curl -b cookies.txt -X POST http://localhost:3000/api/performance \
//-H "Content-Type: application/json" \
//-d '{
//"artist_id": "1",
//"stage_id": "1",
//"start_time": "2025-05-15T19:00:00+00:00",
//"end_time": "2025-05-15T20:30:00+00:00",
//"date": "2025-05-15"
//}'
router.put('/:id', validationMiddleware.validatePerformanceCreationAndUpdate, authMiddleware, authRolesMiddleware(['webadmin', 'producer', 'assistant']), performanceController.updatePerformance);
//curl -b cookies.txt -X PUT http://localhost:3000/api/performance/1 \
//-H "Content-Type: application/json" \
//-d '{
//"start_time": "2025-05-15T19:30:00+00:00",
//"end_time": "2025-05-15T21:00:00+00:00"
//}'
router.delete('/:id', authMiddleware, authRolesMiddleware(['webadmin', 'producer', 'assistant']), performanceController.deletePerformance);
//curl -b cookies.txt -X DELETE http://localhost:3000/api/performance/2

export default router;