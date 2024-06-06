import express from 'express';
import { artistController } from '../controllers/artistController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authRolesMiddleware } from '../middlewares/authRolesMiddleware.js';

const router = express.Router();

router.get('/', artistController.getAllArtists);
//curl -X GET http://localhost:3000/api/artist
router.get('/:id', artistController.getArtistById);
//curl -X GET http://localhost:3000/api/artist/1
router.post('/', authMiddleware, authRolesMiddleware(['webadmin', 'producer']), artistController.createArtist);
//curl -X POST http://localhost:3000/api/artist \
    //-H "Content-Type: application/json" \
    //-d '{
    //"name": "Madonna",
    //"biography": "Biografia da Madonna",
    //"photo_url": "http://exemplo.com/foto.jpg"
    //}'
router.put('/:id', authMiddleware, authRolesMiddleware(['webadmin', 'producer']), artistController.updateArtist);
    //curl -X PUT http://localhost:3000/api/artist/1 \
    //-H "Content-Type: application/json" \
    //-d '{
    //"name": "Madonna",
    //"biography": "Biografia da Madonna",
    //"photo_url": "http://exemplo.com/foto.jpg"
    //}'
router.delete('/:id', authMiddleware, authRolesMiddleware(['webadmin', 'producer']), artistController.deleteArtist);
//curl -X DELETE http://localhost:3000/api/artist/2

export default router;