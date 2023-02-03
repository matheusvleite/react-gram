import express from "express";
import { routerRegister } from "./UserRoutes.js";


export const router = express();

router.use('/api/users', routerRegister)

router.get("/", (req, res) => {
    res.send("API Working!")
})

