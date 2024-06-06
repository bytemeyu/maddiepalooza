import express from 'express';
import { artistController } from '../controllers/artistController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authRolesMiddleware } from '../middlewares/authRolesMiddleware.js';

const router = express.Router();

router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);
router.post('/', authMiddleware, authRolesMiddleware(['webadmin', 'producer']), artistController.createArtist);
router.put('/:id', authMiddleware, authRolesMiddleware(['webadmin', 'producer']), artistController.updateArtist);
router.delete('/:id', authMiddleware, authMiddleware(['webadmin', 'producer']), artistController.deleteArtist);

export default router;