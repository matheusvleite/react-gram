import express from 'express';
import { authGuard } from '../middlewares/authGuard.js';
import { imageUpload } from '../middlewares/imageUpload.js';
import { photoInsertValidation, photoUpdateValidation } from '../middlewares/photoValidation.js'
import { validate } from '../middlewares/handleValidation.js';
import { deletePhoto, getAllPhotos, getPhotoById, getUserPhotos, insertPhoto, updatePhoto } from '../controllers/PhotoController.js'

export const photoRouter = express.Router();

photoRouter.post("/",
    authGuard,
    imageUpload.single("image"),
    photoInsertValidation(),
    validate,
    insertPhoto
);
photoRouter.delete("/:id", authGuard, deletePhoto);
photoRouter.get("/", authGuard, getAllPhotos);
photoRouter.get("/user/:id", authGuard, getUserPhotos);
photoRouter.get("/:id", authGuard, getPhotoById);
photoRouter.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);
