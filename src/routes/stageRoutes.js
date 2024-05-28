import express from 'express';
import { stageController } from '../controllers/stageController.js';
import { stageRepository } from '../repositories/stageRepository';

const router = express.Router();

router.get('/', stageController.getAllStages);
router.get('/:id', stageController.getStageById);
router.post('/', stageController.createStage);
router.put('/:id', stageController.updateStage);
router.delete(':/id', stageController.deleteStage);