import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

const register = async (req, res) => {

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] })
        return
    };

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    if (!newUser) {
        res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."] })
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

export { register };