import express from 'express';
import { register } from '../controllers/UserController.js';
import { validate } from '../middlewares/handleValidation.js';
import { useCreateValidation } from '../middlewares/userValidation.js';

export const routerRegister = express();

routerRegister.post('/register', useCreateValidation(), validate, register);



