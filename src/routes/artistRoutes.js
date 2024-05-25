import express from 'express';
import { artistController } from '../controllers/artistController.js';

const router = express.Router();

router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);
router.post('/', artistController.createArtist);
router.put('/:id', artistController.updateArtist);

export default router;