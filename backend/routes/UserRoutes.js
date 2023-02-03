import express from 'express';
import { register } from '../controllers/UserController.js';

export const routerRegister = express();

routerRegister.post('/register', register);



