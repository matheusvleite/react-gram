import express from 'express';
import { authGuard } from '../middlewares/authGuard.js';
import { imageUpload } from '../middlewares/imageUpload.js';
import { photoInsertValidation } from '../middlewares/photoValidation.js'
import { validate } from '../middlewares/handleValidation.js';
import { insertPhoto } from '../controllers/PhotoController.js'

export const photoRouter = express.Router();

photoRouter.post("/",
    authGuard,
    imageUpload.single("image"),
    photoInsertValidation(),
    validate,
    insertPhoto
);

