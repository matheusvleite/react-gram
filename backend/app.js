import express from "express"
import path from "path"
import cors from "cors";
import dotenv from "dotenv/config";
import { router } from "./routes/Router.js";


const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// routes

app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})