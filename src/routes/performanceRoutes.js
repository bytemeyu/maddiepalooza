import express from 'express';
import { performanceController } from '../controllers/performanceController.js';

const router = express.Router();

router.get('/', performanceController.getAllPerformances);
router.get('/:id', performanceController.getPerformanceById);
router.post('/', performanceController.createPerformance);
router.put('/:id', performanceController.updatePerformance);
router.delete('/:id', performanceController.deletePerformance);

export default router;