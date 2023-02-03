import moongose from 'mongoose';
import User from '../models/User.js';
import Photo from '../models/Photo.js';

export const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename

    const reqUser = req.user;

    const user = await User.findById(reqUser._id)

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    if (!newPhoto) {
        res.status(422).json({
            errors: ["Houve um problema, por favor tente novamente mais tarde."]
        })
        return
    }

    res.status(201).json(newPhoto)
}