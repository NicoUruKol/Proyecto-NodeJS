import jwt from 'jsonwebtoken';


export const validateUser = (email, password) => {
    return (
        email === process.env.AUTH_EMAIL &&
        password === process.env.AUTH_PASSWORD
    );
};

export const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
};
