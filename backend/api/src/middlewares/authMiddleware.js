import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        //Se o token for válido, o payload decodificado do JWT é atribuído a req.user, adicionando assim informações do usuário ao objeto de requisição. Isso facilita o acesso a essas informações em qualquer middleware subsequente ou manipuladores de rota que executam após este middleware de autenticação. 
        next();
    } catch (err) {
        const errorMessage = err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';
        res.status(401).json({ error: errorMessage });
    }
};