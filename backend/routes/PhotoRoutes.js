import express from 'express';
import { authGuard } from '../middlewares/authGuard.js';
import { imageUpload } from '../middlewares/imageUpload.js';
import { commentValidation, photoInsertValidation, photoUpdateValidation } from '../middlewares/photoValidation.js'
import { validate } from '../middlewares/handleValidation.js';
import { commentPhoto, deletePhoto, getAllPhotos, getPhotoById, getUserPhotos, insertPhoto, likePhoto, searchPhotos, updatePhoto } from '../controllers/PhotoController.js'

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
photoRouter.get("/search", authGuard, searchPhotos)
photoRouter.get("/:id", authGuard, getPhotoById);
photoRouter.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);
photoRouter.put("/like/:id", authGuard, likePhoto);
photoRouter.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto);