import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usersService } from "./usersService";

export const authService = {
    login: async(username, password) => {
        const user = await usersService.getUserByUsername(username);
        if (!user) {
            throw new Error('Nome de usuário inválido');
        } 
            
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Senha inválida');
        }
  
        try {
            const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });
            //A função jwt.sign() combina o payload e a chave secreta para criar um token assinado.
            return { id: user.user_id, token };
        } catch(err) {
            console.error(`Erro ao gerar token JWT: ${err.message}`);
            throw err;
        } 
    }
};