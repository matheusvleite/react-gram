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

export const deletePhoto = async (req, res) => {
    const { id } = req.params
    const reqUser = req.user
    try {
        const photo = await Photo.findById(moongose.Types.ObjectId(id))

        if (!photo) {
            res.status(404).json({ erros: ["Foto não encontrada"] });
            return
        }

        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({ errors: ["Ocorreu um erro, por favor tente novamente mais tarde."] })
        }

        await Photo.findByIdAndDelete(photo._id)

        res.status(200).json({ id: photo._id, message: "Foto excluida com sucesso." })
    } catch (error) {
        res.status(404).json({ errors: ["Foto não encontrada."] })

    }
}

export const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos)
}

export const getUserPhotos = async (req, res) => {
    const { id } = req.params

    const photos = await Photo.find({ userId: id })
        .sort([['createdAt', -1]])
        .exec()

    return res.status(200).json(photos);
}