import express from 'express';
import { artistController } from '../controllers/artistController.js';

const router = express.Router();

router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);

export default router;