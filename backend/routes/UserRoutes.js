import express from 'express';
import { login, register } from '../controllers/UserController.js';
import { validate } from '../middlewares/handleValidation.js';
import { useCreateValidation, loginValidation } from '../middlewares/userValidation.js';

export const routerRegister = express();

routerRegister.post('/register', useCreateValidation(), validate, register);
routerRegister.post('/login', loginValidation(), validate, login);




