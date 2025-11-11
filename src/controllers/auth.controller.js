import { createToken, validateUser } from '../services/auth.services.js';

export const login = async (req, res) => {
    const { email, password } = req.body || {};
    const valid = validateUser(email, password);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = createToken({ email });
    res.status(200).json({ token, type: 'Bearer' });
};
