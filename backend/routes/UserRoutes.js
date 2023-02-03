import express from 'express';
import { getCurrentUser, login, register, update } from '../controllers/UserController.js';
import { authGuard } from '../middlewares/authGuard.js';
import { validate } from '../middlewares/handleValidation.js';
import { imageUpload } from '../middlewares/imageUpload.js';
import { useCreateValidation, loginValidation, userUpdateValidate } from '../middlewares/userValidation.js';

export const routerRegister = express();

routerRegister.post('/register', useCreateValidation(), validate, register);
routerRegister.post('/login', loginValidation(), validate, login);
routerRegister.get("/profile", authGuard, getCurrentUser);
routerRegister.put("/",
    authGuard,
    userUpdateValidate(),
    validate,
    imageUpload.single('profileImage'),
    update
);




