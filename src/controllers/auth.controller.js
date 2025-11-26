import { createToken } from "../services/auth.services.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Usuario hardcodeado
    if (email === "test@gmail.com" && password === "123456") {
        const user = { id: "123", email };
        const token = createToken(user);

        return res.status(200).json({ token });
    }

    return res.status(401).json({ message: "Credenciales inválidas" });
};

