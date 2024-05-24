import express from 'express';
import { artistController } from '../controllers/artistController.js';

const router = express.Router();

router.get('/', artistController.getAllArtists);

export default router;