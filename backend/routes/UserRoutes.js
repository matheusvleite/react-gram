import express from 'express';
import { getCurrentUser, getUserById, login, register, update } from '../controllers/UserController.js';
import { authGuard } from '../middlewares/authGuard.js';
import { validate } from '../middlewares/handleValidation.js';
import { imageUpload } from '../middlewares/imageUpload.js';
import { useCreateValidation, loginValidation, userUpdateValidate } from '../middlewares/userValidation.js';

export const routes = express();

routes.post('/register', useCreateValidation(), validate, register);
routes.post('/login', loginValidation(), validate, login);
routes.get("/profile", authGuard, getCurrentUser);
routes.put("/",
    authGuard,
    userUpdateValidate(),
    validate,
    imageUpload.single('profileImage'),
    update
);
routes.get('/:id', getUserById);



