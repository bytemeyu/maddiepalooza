import express from 'express';
import { usersController } from '../controllers/usersController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authRolesMiddleware } from '../middlewares/authRolesMiddleware.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, authRolesMiddleware(['webadmin', 'producer', 'assistant']), usersController.getAllUsers);
//curl -b cookies.txt -X GET http://localhost:3000/api/users
router.get('/:id', authMiddleware, authRolesMiddleware(['webadmin', 'producer', 'assistant']), usersController.getUserById);
//curl -b cookies.txt -X GET http://localhost:3000/api/users/1
router.post('/', validationMiddleware.validateUsersCreationAndUpdate, authMiddleware, authRolesMiddleware(['webadmin', 'producer']), usersController.createUser);
//curl -b cookies.txt -X POST http://localhost:3000/api/users \
//-H "Content-Type: application/json" \
//-d '{
//"email": "anita@mail.com",
//"username": "anitakawasaki",
//"password": "asenhasemhash",
//"role": "webadmin"
//}'
router.put('/:id', validationMiddleware.validateUsersCreationAndUpdate, authMiddleware, authRolesMiddleware(['webadmin', 'producer', 'assistant']), usersController.updateUser);
//curl -b cookies.txt -X PUT http://localhost:3000/api/users/1 \
//-H "Content-Type: application/json" \
//-d '{
//"email": "anita@mail.com.br"
//}'
router.delete('/:id', authMiddleware, authRolesMiddleware(['webadmin', 'producer']), usersController.deleteUser);
//curl -b cookies.txt -X DELETE http://localhost:3000/api/users/1

export default router;