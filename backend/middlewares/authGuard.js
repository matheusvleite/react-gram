import jwt from 'jsonwebtoken';
import User from '../models/User.js'

const jwtSecret = process.env.JWT_SECRET;

export const authGuard = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ erros: ["Acesso negado!"] })

    try {
        const verified = jwt.verify(token, jwtSecret);

        req.user = await User.findById(verified.id).select("-password")

        next()

    } catch (error) {
        res.status(401).json({ errors: ["Token inválido."] })
    }
}