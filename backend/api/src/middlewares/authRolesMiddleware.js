export const authRolesMiddleware = (allowedRoles = []) => {
    if (typeof allowedRoles === 'string') {
        allowedRoles = [allowedRoles];
        // Garante que allowedRoles seja sempre um array.
    }

    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        next();
        // Se o usuário tem um role permitido, chama o próximo middleware. (Se ele não tiver, para na condição acima e não chama um próximo middleware, ou seja, interrompe o acesso a seja lá o que for.)
    };
};
