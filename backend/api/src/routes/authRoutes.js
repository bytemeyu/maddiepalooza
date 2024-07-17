import express from 'express';
import { authController } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authRolesMiddleware } from '../middlewares/authRolesMiddleware.js';

const router = express.Router();

router.post('/login', authController.login);
//curl -c cookies.txt -X POST http://localhost:3000/api/auth/login \
//-H "Content-Type: application/json" \
//-d '{
//"username": "anitakawasaki",
//"password": "asenhasemhash"
//}'
router.delete('/logout', authMiddleware, authRolesMiddleware(['webadmin', 'producer', 'assistant']), authController.logout);
//curl -b cookies.txt -X DELETE http://localhost:3000/api/auth/logout
//o seguinte comando para limpar cookies.txt manualmente (e simular o logout no navegador): > cookies.txt

export default router;