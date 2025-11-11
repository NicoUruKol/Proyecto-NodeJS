import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    try {
        const header = req.headers.authorization || '';
        const [, token] = header.split(' '); // "Bearer <token>"
        if (!token) return res.status(401).json({ message: 'Token requerido' });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        if (err?.name === 'JsonWebTokenError')
        return res.status(401).json({ message: 'Token inválido' });
        if (err?.name === 'TokenExpiredError')
        return res.status(401).json({ message: 'Token expirado' });
        return res.status(403).json({ message: 'No autorizado' });
    }
};
