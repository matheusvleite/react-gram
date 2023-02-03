import express from "express";
import { routes } from "./UserRoutes.js";


export const router = express();

router.use('/api/users', routes)

router.get("/", (req, res) => {
    res.send("API Working!")
})

