import express from "express";
import { photoRouter } from "./PhotoRoutes.js";
import { routes } from "./UserRoutes.js";


export const router = express();

router.use('/api/users', routes)
router.use('/api/photos', photoRouter)


