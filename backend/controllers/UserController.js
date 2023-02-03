import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

export const register = async (req, res) => {

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

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        res.status(404).json({ erros: ["Usuário não encontrado."] })
        return
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ erros: ["Senha inválida."] })
        return
    }

    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })

}

export const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
}

export const update = async (req, res) => {
    const { name, password, bio } = req.body

    let profileImage = null

    if (req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password")

    if (name) {
        user.name = name
    }

    if (password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash
    }

    if (profileImage) {
        user.profileImage = profileImage
    }

    if (bio) {
        user.bio = bio
    }

    await user.save();

    res.status(200).json(user);
}

export const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")

        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado.2"] })
            return
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ errors: ["Usuário não encontrado"] })
        return
    }

}